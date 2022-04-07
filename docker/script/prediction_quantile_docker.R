# ------------------------------------------------------------------------------
# Data pre-processing for prediction
  rm(list = ls())

  print(noquote("Loading libraries ..."))
  require(rgdal)
  require(caret)
  require(dplyr)
  require(sf)
  require(sp)
  require(raster)
  require(ranger)
  require(randomForest)
  require(hydroGOF)
  require(Metrics)
  require(ggplot2)
  require(quantregForest)

# ------------------------------------------------------------------------------ 
# list raster files 
  setwd("/workdir/data/input")
  
  print(noquote("Reading covariate raster ..."))
  # cov <- unzip("stack_amhara.zip")
  cov_stack <- stack("stack_amhara.tif")
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
  new_crs <- proj4string(cov_stack)
  points <- read.csv("csv_data_amhara.csv", header = T, sep = ",")
  coordinates(points) <- ~lon+lat
  proj4string(points) <- new_crs
  
  setwd("/workdir/data/final")
  n <- raster("N_optimal.tif")
  p <- raster("P_optimal.tif")
  # s <- raster("wheat_S_potential.tif")
 yield_pot <- raster("optimal_yield.tif")
  
# ------------------------------------------------------------------------------ 
# stack rasters
  cov <- stack(cov_stack, n,p, yield_pot)
  names(cov)[29:31] <- c("n", "p", "yield")

# ------------------------------------------------------------------------------
# extracting values by points
  print(noquote("Extracting raster values ..."))
  grid_val <- extract(cov, points)
  grid_val <- as.data.frame(grid_val)
  grid_val <-  unique(na.omit(grid_val[, 1:ncol(grid_val)]))
  
  inTrain <- sample(nrow(grid_val), 0.8 * nrow(grid_val))
  Xtraining     <- grid_val[inTrain,c(1:30)]
  Xtesting      <- grid_val[-inTrain,c(1:30)]
  Ytraining     <- grid_val[inTrain,31]
  Ytesting      <- grid_val[-inTrain,31]
  
  print(noquote("Training the model ..."))
  mod_fit <- quantregForest(x = Xtraining, y = Ytraining)
  
  print(noquote("Predicting attainable yield ..."))
  pred_90 <- predict(object = cov, model = mod_fit, what =  0.95)
  
  print(noquote("Writing rasters and csv files ..."))
  setwd("/workdir/data/final")
  writeRaster(
    pred_90,
    filename = "attainable_yield_95",
    format = "GTiff",
    overwrite = TRUE)
  pred_sgdf <- as(pred_90, "SpatialGridDataFrame") 
  pred_sgdf <- as.data.frame(pred_sgdf)
  n <- as(n, "SpatialGridDataFrame")
  n <- as.data.frame(n)
  p <- as(p, "SpatialGridDataFrame")
  p <- as.data.frame(p)
  csv_attainable <- cbind(pred_sgdf[,1], n[,1], p)
  
  colnames(csv_attainable) <- c("attainable_yield","n","p","lon","lat")
  write.csv(csv_attainable, file = "attainable_yield_normal.csv", row.names = F, sep = ",")
  