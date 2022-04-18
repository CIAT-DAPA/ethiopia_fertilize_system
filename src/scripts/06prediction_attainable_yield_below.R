# ------------------------------------------------------------------------------
# souring data preparation script

  rm(list = ls())

  setwd("/workdir/script")
  source("input.R")
  
  setwd("/workdir/data/final")
  n <- raster("wheat_n_below.tif")
  p <- raster("wheat_p_below.tif")
  k <- raster("wheat_k_below.tif")
  # s <- raster("wheat_S_potential.tif")
  yield_pot <- raster("wheat_optimal_yield_below.tif")
  
# ------------------------------------------------------------------------------ 
# stack rasters
  cov <- stack(stack_below, n,p, k, yield_pot)
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
    filename = "wheat_attainable_yield_below",
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
  write.csv(csv_attainable, file = "wheat_attainable_yield_below.csv", row.names = F, sep = ",")
  