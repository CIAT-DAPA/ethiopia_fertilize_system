import React from 'react';

import './Home.css';
import landscape from '../../assets/images/landscape.jpg';
import soil_climate_specific from '../../assets/images/soil_climate_specific.jpg';
import season_specific from '../../assets/images/season_specific.jpg';
import segmentation from '../../assets/images/segmentation.jpg';
function Home() {

    return (
        <main>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className="carousel-item active">
                        <img className='bd-placeholder-img' width="100%" height="100%" aria-hidden="true" alt="" src={landscape} />
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>NextGen Agroadvisory</h1>
                                <p>
                                    NextGenAgroadvisory is a project designed to develop location-, context-, and climate- specific agricultural
                                    advisories particularly related to optimal fertilizer application, integrated soil fertility management (ISFM),
                                    climate information service, climate smart agricultural activities (CSA), pest and disease surveillance, and other
                                    agricultural investments in Ethiopia. It is a project by the Alliance of Bioversity International and the International
                                    Center for Tropical Agriculture (CIAT) in partnership with support of SSHI (BMGF), EiA (oneCGIAR initiative),
                                    AICCRA (World Bank), and SI-MFS (oneCGIAR initiative).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {
                /* 
                <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" aria-label="Slide 1" className="active" aria-current="true"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
                </div>
                <div className="carousel-inner">

                    <div className="carousel-item">
                        <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>Coalition of the Willing</h1>
                                <p>Powering data-driven solutions for Ethiopian agriculture (cgiar.org)</p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
                */
            }
            <br />
            <div className="container marketing">
                <div className="row">
                    <div className="col-lg-4">
                        <img className="bd-placeholder-img rounded-circle" alt="" src={soil_climate_specific} width="140" height="140" role="img" />
                        <h2>Site specific</h2>
                        <p>The fertilizer advisory is site-specific that accounts the local soil topography, climate condition.</p>
                        <p></p>
                    </div>
                    <div className="col-lg-4">
                        <img className="bd-placeholder-img rounded-circle" alt="" src={segmentation} width="140" height="140" role="img" />
                        <h2>Farmer segmentation</h2>
                        <p>It is context specific that provides targeted advisory for various segments of the society based on gender and resource endowment.</p>
                        <p></p>
                    </div>
                    <div className="col-lg-4">
                        <img className="bd-placeholder-img rounded-circle" alt="" src={season_specific} width="140" height="140" role="img" />
                        <h2>Season smart</h2>
                        <p>It is season-smart in which the advisories are based on the next growing period forecast weather conditions.</p>
                        <p></p>
                    </div>
                </div>
            </div>
            <h1 className='text-center'>Acknowledgements</h1>
        </main>
    );
}

export default Home;