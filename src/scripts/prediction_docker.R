# ------------------------------------------------------------------------------
# Data pre-processing for prediction

rm(list = ls())

  print(noquote("Loading libraries ..."))
  require(rgdal)
  require(raster)
  require(caret)
  require(dplyr)
  require(sf)
  require(sp)
  require(ranger)
  require(randomForest)
  require(hydroGOF)
  require(Metrics)
  require(ggplot2)

# ------------------------------------------------------------------------------ 
# unzip & read the raster stac
setwd("/workdir/rdata/input")
 
 print(noquote("Unzipping covaraite raster ..."))
 cov <- unzip("stack_eth.zip")
 cov_stack <- stack("stack_eth.tif")
 names(cov_stack) <- 
   c(
     "bdod",
     "cec",
     "cfvo",
     "clay",
     "dem",
     "landform",
     "nitrogen",
     "ocd",
     "ocs",
     "phh2o",
     "sand",
     "silt",
     "slope",
     "soc",
     # "soiltype",
     "tpi",
     "tri", 
     "prcp1",
     "prcp2",
     "prcp3",       
     "srad1",
     "srad2",        
     "srad3",
     "tmax1",        
     "tmax2",       
     "tmax3",       
     "tmin1",      
     "tmin2",       
     "tmin3"
   )
# ------------------------------------------------------------------------------
# read csv data and convert to spatial
  # cov_stack <- cov_stack[[-6]]
  
  points <- read.csv("csv_eth.csv", header = T, sep = ",")
  points_train <- dplyr::select(points, -c("lon","lat"))
  cov_soil_land <- cov_stack[[1:16]]
  new_crs <- proj4string(cov_stack)
  coordinates(points) <- ~lon+lat
  proj4string(points) <- new_crs

# ------------------------------------------------------------------------------
# extracting values by points
  print(noquote("Extracting point vaues..."))
  grid_val <- extract(cov_soil_land, points)
  cov_train <- cbind(grid_val, points_train) # covariates, yield & nps
  cov_train <- cov_train[complete.cases(cov_train),]
  cov_train$landform <- as.factor(cov_train$landform)
  # cov_train$soiltype <- as.factor(cov_train$soiltype)
  yield_nps <- dplyr::select(cov_train, c("n","p","k", "yield"))
  cov_train <- dplyr::select(cov_train, -c("n","p","k", "yield"))
  cov_train <- cbind(cov_train, yield_nps)
  cov_train <- unique(na.omit(cov_train[, 1:ncol(cov_train)])) #removing NAs and duplicates
  
  # dir.create("workspace")
  setwd("/workdir/rdata/workspace")
  save(cov_train, file = paste0("regression_matrix", ".RData"))
  
  #load the rda file
  # load(file = "./output/regression_matrix.rda")#loads the global env with the file
  
  # training
  mtry <- as.integer((ncol(cov_train))/3) #this will be optimized
  mtry <- seq(mtry-8, mtry+8, by = 2)
  
  rf_fitControl <- trainControl(method = "repeatedcv",
                                number = 10,
                                repeats = 5)
  
  rf_tuneGrid <- expand.grid(.mtry = mtry,
                             .splitrule =  "maxstat",
                             .min.node.size = c(20, 30))
  
  inTrain <- createDataPartition(y =  cov_train$yield, p = 0.70, list = FALSE)
  training <- cov_train[inTrain,]
  testing <- cov_train[-inTrain,]
  
  print(noquote("Training the model..."))
  mod_fit <- train(
    yield ~ .,
    data = training,
    method = "ranger",
    trControl = rf_fitControl,
    importance = 'impurity',
    tuneGrid = rf_tuneGrid,
    preProcess = c('scale', 'center'))
  
  # setwd(workspace)
  save(mod_fit, file = paste0("model", ".RData"), Overwrite = T)
  # load(file = "./output/model.RData")
# ------------------------------------------------------------------------------  
# Plot and save variable importance and testing
  var_imp <- varImp(mod_fit)
  ggplot(var_imp)
  
  ggsave(filename = "variable_importance.png", width = 20, height = 10)
  
# ------------------------------------------------------------------------------  
# Multiple iteration

  N <- c(seq(0, 75, 15), seq(100, 200, 25)) #this will be optimized
  P <- K <- N[1:7]
  # P <- K <- N[1:3]
  npk <- expand.grid(N = N, P = P, K = K)
  
#loop for climate forcast scenario
# setwd(workspace)
  path <- "yield"
  dir.create(path, FALSE, TRUE)
  path = "/workdir/rdata/workspace/yield"
  a <- apply(npk, 1, function(i) paste(i, collapse="."))
  f <- file.path(path, paste0("yield.", a, ".tif"))
  setwd("/workdir/rdata/workspace/yield")
  # print(noquote("Predicting ..."))
  for (i in 1:nrow(npk)) {
    if (file.exists(f[i])) next
    NPK <- data.frame(n = npk$N[i], p = npk$P[i], k = npk$K[i])
      print(noquote(paste("Predicting yield",n,p,k,sep = ".")))
      predict(
        cov_stack, # use below normal, average and above average
        mod_fit,
        const = NPK,
        filename = f[i],
        overwrite = TRUE,
        wopt = list(datatype = "INT2S", names = a[i])
      )
  }
  
