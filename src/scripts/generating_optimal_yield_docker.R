# ------------------------------------------------------------------------------
# Generating optimal yield

rm(list = ls())

print(noquote("Loading libraries ..."))
  require(rgdal)
  require(raster)
  require(dplyr)
  require(sf)
  require(sp)
  require(Metrics)
  require(ggplot2)

# ------------------------------------------------------------------------------ 
# list raster files
  print(noquote("Reading and stacking rasters ..."))
  setwd("/workdir/data/workspace/yield")
  # dir.create("output", showWarnings = F)
  rfiles <- list.files(path = ".", pattern = ".tif$", all.files = T)
  yield_ras <- lapply(rfiles, raster)
  yield_stack <- stack(yield_ras)
  
  print(noquote("Generating optimal yield ..."))
  optimal_yield <- max(yield_stack)
  
  setwd("/workdir/data/final")
  writeRaster(
    optimal_yield,
    filename = "wheat_optimal_yield_normal.tif",
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
      # pattern = "(.*?).([[:digit:]]+).([[:digit:]]+).([[:digit:]]+)",
      pattern = "(.*?).([[:digit:]]+).([[:digit:]]+)",
      col_vals,
      proto = data.frame(
        chr = character(),
        n = integer(),
        p = integer()
      )
    )
  print(noquote("Generating raster and csv files ..."))
# create a csv file for the layers
  n_layer <- p_layer <- raster(optimal_yield)
  values(n_layer) <- nps_df$n
  values(p_layer) <- nps_df$p
  # values(s_layer) <- nps_df$n
  
  n_layer2 <- mask(n_layer, optimal_yield)
  p_layer2 <- mask(p_layer, optimal_yield)
  # s_layer2 <- mask(s_layer, optimal_yield)
  
  writeRaster(n_layer2, filename = "wheat_n_normal", format = "GTiff", overwrite = T)
  writeRaster(p_layer2, filename = "wheat_p_normal", format = "GTiff", overwrite = T)
  
  n <- as(n_layer2, "SpatialGridDataFrame")
  n <- as.data.frame(n)
  p <- as(p_layer2, "SpatialGridDataFrame")
  p <- as.data.frame(p)
  # s <- as(s_layer2, "SpatialGridDataFrame")
  # s <- as.data.frame(s)
  
  
  # csv_optimal <- cbind(grid2[,1], n[,1], p[1], s)
  csv_optimal <- cbind(grid2[,1], n[,1], p)
  colnames(csv_optimal) <- c("optimal_yield","n","p","lon","lat")
  write.csv(csv_optimal,
            file = "wheat_optimal_yield_normal.csv",
            row.names = F,
            sep = ",")
  
