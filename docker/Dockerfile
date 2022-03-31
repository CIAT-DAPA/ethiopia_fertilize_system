#FROM debian:buster
FROM ubuntu

WORKDIR /workdir

COPY ./r-libraries/ /workdir/r-install-libraries

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Bogota

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
    libudunits2-dev \
    ca-certificates \
    software-properties-common \
    gnupg \
    && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 'E298A3A825C0D65DFD57CBB651716619E084DAB9' \
    && add-apt-repository 'deb https://cloud.r-project.org/bin/linux/ubuntu focal-cran40/' \
    && apt-get -y install r-base \
    && Rscript /workdir/r-install-libraries/imports.r



# docker build -t deguzman98/fertilize_app_process:latest .
# docker tag da3459a97f66 deguzman98/fertilize_app_process:latest

# docker run -it --rm deguzman98/fertilize_app_process:latest /bin/bash