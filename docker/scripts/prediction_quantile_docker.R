# ------------------------------------------------------------------------------
# Data pre-processing for prediction
  rm(list = ls())

  message(noquote("Loading libraries ..."))
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
  
  message(noquote("Reading covariate raster ..."))
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
  new_crs <- proj4string(cov_stack)
  points <- read.csv("csv_eth.csv", header = T, sep = ",")
  coordinates(points) <- ~lon+lat
  proj4string(points) <- new_crs
  
  setwd("/workdir/data/final")
  n <- raster("wheat_n_normal.tif")
  p <- raster("wheat_p_normal.tif")
  k <- raster("wheat_k_normal.tif")
  # s <- raster("wheat_S_potential.tif")
  yield_pot <- raster("wheat_optimal_yield_normal.tif")
  
# ------------------------------------------------------------------------------ 
# stack rasters
  cov <- stack(cov_stack, n,p, k, yield_pot)
  names(cov)[29:32] <- c("n", "p","k", "yield")

# ------------------------------------------------------------------------------
# extracting values by points
  message(noquote("Extracting raster values ..."))
  grid_val <- extract(cov, points)
  grid_val <- as.data.frame(grid_val)
  grid_val <-  unique(na.omit(grid_val[, 1:ncol(grid_val)]))
  
  inTrain <- sample(nrow(grid_val), 0.8 * nrow(grid_val))
  Xtraining     <- grid_val[inTrain,c(1:31)]
  Xtesting      <- grid_val[-inTrain,c(1:31)]
  Ytraining     <- grid_val[inTrain,32]
  Ytesting      <- grid_val[-inTrain,32]
  
  message(noquote("Training the model ..."))
  mod_fit <- quantregForest(x = Xtraining, y = Ytraining)
  
  message(noquote("Predicting attainable yield ..."))
  pred_90 <- predict(object = cov, model = mod_fit, what =  0.95)
  
  message(noquote("Writing rasters and csv files ..."))
  setwd("/workdir/data/final")
  writeRaster(
    pred_90,
    filename = "wheat_attainable_yield_normal",
    format = "GTiff",
    overwrite = TRUE)
  pred_sgdf <- as(pred_90, "SpatialGridDataFrame") 
  pred_sgdf <- as.data.frame(pred_sgdf)
  n <- as(n, "SpatialGridDataFrame")
  n <- as.data.frame(n)
  p <- as(p, "SpatialGridDataFrame")
  p <- as.data.frame(p)
  k <- as(k, "SpatialGridDataFrame")
  k <- as.data.frame(k)
  
  csv_attainable <- cbind(pred_sgdf[,1], n[,1], p[,1], k)
  
  colnames(csv_attainable) <- c("attainable_yield","n","p","k","lon","lat")
  write.csv(csv_attainable, file = "wheat_attainable_yield_normal.csv", row.names = F, sep = ",")
  