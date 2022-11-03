import React from 'react';

import './Home.css';
import landscape from '../../assets/images/landscape.jpg';
import soil_climate_specific from '../../assets/images/soil_climate_specific.jpg';
import season_specific from '../../assets/images/season_specific.jpg';
import segmentation from '../../assets/images/segmentation.jpg';
function Home() {

    return (
        <main>
            <br/>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        
                                    <h1 className='font-link text-center'>NextGen Agroadvisory</h1>
                                    <p className='font-link-body text-center'>
                                        NextGenAgroadvisory is a project designed to develop location-, context-, and climate- specific agricultural
                                        advisories particularly related to optimal fertilizer application, integrated soil fertility management (ISFM),
                                        climate information service, climate smart agricultural activities (CSA), pest and disease surveillance, and other
                                        agricultural investments in Ethiopia. It is a project by the Alliance of Bioversity International and the International
                                        Center for Tropical Agriculture (CIAT) in partnership with support of SSHI (BMGF), EiA (oneCGIAR initiative),
                                        AICCRA (World Bank), and SI-MFS (oneCGIAR initiative).
                                    </p>

                        
                                
                    </div>

                </div>
                <div className='row row-content mt-5'>
                    <form>
                        <div className='row form-group'>
                            <div className='col-6'>
                                <label>Region</label>
                                <select class="form-select" aria-label="Disabled select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                            </div>
                            <div className='col-6'>
                                <label>Zone</label>
                                <select className="form-select" aria-label="Disabled select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                            </div>
                            <div className='col-6 mt-4'>
                                <label>Woreda</label>
                                <select className="form-select" aria-label="Disabled select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                            </div>
                            <div className='col-6 mt-4'>
                                <label>Kebele</label>
                                <select className="form-select" aria-label="Disabled select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                            </div>

                            <div className="row form-check mt-4">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" for="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                            <div className="row form-check mt-4">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" for="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                            <div className="row form-check mt-4">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" for="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>

                        </div>



                    </form>

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
           
        
           
        </main>
    );
}

export default Home;