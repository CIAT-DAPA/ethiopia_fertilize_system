# ------------------------------------------------------------------------------
# Generating optimal yield

rm(list = ls())

message(noquote("Loading libraries ..."))
  require(rgdal)
  require(raster)
  require(dplyr)
  require(sf)
  require(sp)
  require(Metrics)
  require(ggplot2)

# ------------------------------------------------------------------------------ 
# list raster files
  message(noquote("Reading and stacking rasters ..."))
  setwd("/workdir/data/workspace/yield_below")
  # dir.create("output", showWarnings = F)
  rfiles <- list.files(path = ".", pattern = ".tif$", all.files = T)
  yield_ras <- lapply(rfiles, raster)
  yield_stack <- stack(yield_ras)
  
  message(noquote("Generating optimal yield ..."))
  optimal_yield <- max(yield_stack)
  
  setwd("/workdir/data/final")
  writeRaster(
    optimal_yield,
    filename = "wheat_optimal_yield_below.tif",
    format = "GTiff",
    overwrite = TRUE)

    grid <- as(optimal_yield, "SpatialGridDataFrame")
    grid2 <- as.data.frame(grid)
# ------------------------------------------------------------------------------
# generate n, p, s layer that generates the optimal yield
  vals <- values(yield_stack) # creates a matrix
  vals[is.na(vals)] <- -1 # changing NA values to -1
  col_vals <- colnames(vals)[max.col(vals, ties.method = "first")] # selects the max value column
  
# capture layer names and change to data frame
  nps_df <-
    strcapture(
      pattern = "(.*?).([[:digit:]]+).([[:digit:]]+).([[:digit:]]+)",
      # pattern = "(.*?).([[:digit:]]+).([[:digit:]]+)",
      col_vals,
      proto = data.frame(
        chr = character(),
        n = integer(),
        p = integer(),
        k = integer()
      )
    )
  message(noquote("Generating raster and csv files ..."))
# create a csv file for the layers
  n_layer <- p_layer <- k_layer <- raster(optimal_yield)
  values(n_layer) <- nps_df$n
  values(p_layer) <- nps_df$p
  values(k_layer) <- nps_df$k
  
  n_layer2 <- mask(n_layer, optimal_yield)
  p_layer2 <- mask(p_layer, optimal_yield)
  k_layer2 <- mask(k_layer, optimal_yield)
  
  writeRaster(n_layer2, filename = "wheat_n_below", format = "GTiff", overwrite = T)
  writeRaster(p_layer2, filename = "wheat_p_below", format = "GTiff", overwrite = T)
  
  n <- as(n_layer2, "SpatialGridDataFrame")
  n <- as.data.frame(n)
  p <- as(p_layer2, "SpatialGridDataFrame")
  p <- as.data.frame(p)
  k <- as(k_layer2, "SpatialGridDataFrame")
  k <- as.data.frame(k)
  
  
  # csv_optimal <- cbind(grid2[,1], n[,1], p[1], s)
  csv_optimal <- cbind(grid2[,1], n[,1], p[,1], k)
  colnames(csv_optimal) <- c("optimal_yield","n","p","k","lon","lat")
  write.csv(csv_optimal,
            file = "wheat_optimal_yield_below.csv",
            row.names = F,
            sep = ",")
  
