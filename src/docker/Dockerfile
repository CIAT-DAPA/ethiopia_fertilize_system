#FROM debian:buster
FROM ubuntu



RUN apt-get clean \
    && apt-get update \
    && apt-get install -y \
    make \
    gcc \ 
    vim \
    unzip \
    dirmngr \
    apt-transport-https \
    cmake \
    gfortran \
    git \
    wget \
    libnetcdf-dev \
    grads \
    cdo \
    nco \
    gdal-bin \
    proj-bin \
    libgdal-dev \
    libproj-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libudunits2-dev

# && printf "y\n13\n34" | apt-get install software-properties-common \
# && printf "y\n13\n34" | apt-get install libgdal-dev \ 
# && printf "y\n13n\34" | apt-get install libudunits2-dev \
# && printf "y\n13\n34" | apt-get install libxml2-dev \
# && printf "y\n13\n34" | apt install dirmngr gnupg apt-transport-https ca-certificates software-properties-common libssl-dev libgdal-dev \
# && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 'E298A3A825C0D65DFD57CBB651716619E084DAB9' \
# && add-apt-repository 'deb https://cloud.r-project.org/bin/linux/ubuntu focal-cran40/' \
# && printf "y" | apt install r-base
#&& Rscript imports.r



# docker build -t deguzman98/fertilize_app_process:latest .
# docker run -it --rm deguzman98/fertilize_app_process:latest /bin/bash