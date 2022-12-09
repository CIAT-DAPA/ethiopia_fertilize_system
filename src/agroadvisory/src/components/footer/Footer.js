import React from 'react';

import moaLogo from '../../assets/images/moa-logo.png';
import eiarLogo from '../../assets/images/eiar-logo.webp';
import atiLogo from '../../assets/images/ati-logo.png';
import allianceLogo from '../../assets/images/alliance-logo.png'
import aiccraLogo from '../../assets/images/aiccra-logo.png';
import eiaLogo from '../../assets/images/eia-logo.png'
import gizLogo from '../../assets/images/giz-logo.jpg'
import cowLogo from '../../assets/images/cow-logo.png'

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
                            <img className="figure-img rounded" alt="" src={allianceLogo} width="130" height="75" role="img" />
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
                            <img className="figure-img rounded" alt="" src={eiaLogo} width="105" height="75" role="img" />
                        </div>

                        <div className="col">
                            <img className="figure-img rounded" alt="" src={aiccraLogo} width="175" height="75" role="img" />
                        </div>
                        
                        <div className="col">
                            <img className="figure-img rounded" alt="" src={atiLogo} width="175" height="75" role="img" />
                        </div>

                        <div className="col">
                            <img className="figure-img rounded" alt="" src={cowLogo} width="175" height="75" role="img" />
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