import React from 'react';

import moaLogo from '../../assets/images/moa-logo.png';
import eiarLogo from '../../assets/images/eiar-logo.webp';
import dgLogo from '../../assets/images/Digital-green-logo.png';
import allianceLogo from '../../assets/images/alliance-logo.jpg'
import aiccraLogo from '../../assets/images/aiccra-logo.png';
import eiaLogo from '../../assets/images/eia-logo.png'
import gizLogo from '../../assets/images/giz-logo.jpg'

import './Footer.css'

function Footer() {
    return (

        <div className="card text-center">
            <div className="card-header">
                Partners
            </div>

            <div className="card-body">

                <div className="d-flex justify-content-center">
                    <div className="row">

                        <div className="col">
                            <img className="figure-img rounded" alt="" src={allianceLogo} width="150" height="75" role="img" />
                        </div>
                        
                        <div className="col">
                            <img className="figure-img rounded" alt="" src={gizLogo} width="200" height="75" role="img" />
                        </div>

                        <div className="col">
                            <img className="figure-img" alt="" src={eiarLogo} width="175" height="75" role="img" />
                        </div>

                        <div className="col">
                            <img className="figure-img rounded" alt="" src={moaLogo} width="140" height="75" role="img" />
                        </div>

                        <div className="col">
                            <img className="figure-img rounded" alt="" src={eiaLogo} width="125" height="75" role="img" />
                        </div>

                        <div className="col">
                            <img className="figure-img rounded" alt="" src={aiccraLogo} width="175" height="75" role="img" />
                        </div>
                        
                        <div className="col">
                            <img className="figure-img rounded" alt="" src={dgLogo} width="230" height="75" role="img" />
                        </div>




                        
                        <div className="col mt-2">
                            <h1 className="card-title">CoW</h1>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="card-footer text-muted">
                    <p>Develop by <a href="https://ciat.cgiar.org/" target="_blank" className="">Alliance Bioversity International - CIAT</a>, 
                        under SSHI and EiA.</p>
            </div>

            
        </div>
    );
}

export default Footer;