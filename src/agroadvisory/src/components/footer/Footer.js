import React from 'react';

import moaLogo from '../../assets/images/moa-logo.png';
import eiarLogo from '../../assets/images/eiar-logo.png';
import dgLogo from '../../assets/images/Digital-green-logo.png';


function Footer() {
    return (
        <div class="card text-center">
            <div class="card-header">
                Partners
            </div>

        <div class="card-body">

            <div className="d-flex justify-content-center">
                <div className="row">
                    <div className="col">
                        <img className="figure-img rounded" alt="" src={moaLogo} width="150" height="100" role="img" />
                    
                    </div>
                    <div className="col">
                        <img className="figure-img" alt="" src={eiarLogo} width="200" height="50" role="img" />
                    
                    </div>
                    <div className="col">
                        <img className="figure-img rounded" alt="" src={dgLogo} width="250" height="75" role="img" />
                
                    </div>
                    <div className="col">
                        <h5 class="card-title">CoW</h5>
                    </div>
                </div>
            </div>
        </div>

            
        <div class="card-footer text-muted">
                <p>Develop by <a href="https://ciat.cgiar.org/" target="_blank" className="">Alliance Bioversity International - CIAT</a>, 
                    <span className=""> under SSHI and EiA</span>.</p>
        </div>

            
        </div>
    );
}

export default Footer;