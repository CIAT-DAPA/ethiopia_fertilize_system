import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Menu() {
    const [reportButtonDisabled, setReportButtonDisabled] = React.useState("false");
    const reportInput = useSelector((state) => state.report);

    React.useEffect(() => {
        //Regions
        if (reportInput?.kebele) {
            setReportButtonDisabled("false");
        }
    }, [reportInput]);

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" style={{ zIndex: '2000' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NextGen Agroadvisory</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/fertilizer_advisories">Fertilizer</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/agroclimate">Agroclimate</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/isfm">ISFM</Link>
                            </li>
                            <li className="nav-item">
                               <Link className="nav-link" to="/irrigation">Irrigation scheduling</Link>
                           </li> */}
                            {/* <li className="nav-item">
                                <a className="nav-link" href="/pest_disease">Pest and disease surveillance</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/csa">CSA</a>
                            </li> 
                            <li className="nav-item">
                                <a className="nav-link" href="/mechanization">Mechanization</a>
                            </li>*/}
                            {
                                reportInput?.type === "kebele" ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/report" >Report</Link>
                                    </li>
                                    : reportInput?.type === "woreda" ?
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/report_woreda" >Report</Link>
                                        </li>
                                        :
                                        <li className="nav-item">
                                            <Link className="nav-link disabled" to="/report" aria-disabled="true">Report</Link>
                                        </li>

                            }
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Advisory Components
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item dropdown-toggle" href="#" id="navbar2Dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Fertilizer
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbar2Dropdown">
                                        <Link className="dropdown-item" to="/fertilizer_advisories">N, P & Optimal yield</Link>
                                        <Link className="dropdown-item" to="/fertilizer_advisories_nps_urea">NPS & Urea</Link>
                                    </div>

                                    <Link className="dropdown-item" to="/isfm">ISFM</Link>
                                    <Link className="dropdown-item" to="/csa">CSA</Link>
                                    <Link className="dropdown-item" to="/irrigation">Irrigation</Link>
                                    <Link className="dropdown-item" to="/lime">Lime</Link>
                                    <Link className="dropdown-item" to="/agroclimate">Agroclimate</Link>
                                    <Link className="dropdown-item" to="/wheat_rust">Wheat rust</Link>
                                    {/* <Link className="dropdown-item" to="/pest_disease">Pest and disease surveillance</Link>
                                    <Link className="dropdown-item" to="/mechanization">Mechanization</Link>
                                    <Link className="dropdown-item" to="/bundled_aas">Bundled AAS</Link> */}
                                </div>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/bundled_aas">Bundled AAS</Link>
                            </li> */}
                            

                            <li className="navbar-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbar_api" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    APIs
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbar_api">
                                    <a className="dropdown-item" href="https://webapi.nextgenagroadvisory.com/" target="_blank">API NextGen</a>
                                    <a className="dropdown-item" href="https://webapi.aclimate.org/" target="_blank">API Aclimate</a>
                                </div>
                                
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/methodology">Methodology</Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/about">About us</Link>
                            </li>
                        </ul>



                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Menu;