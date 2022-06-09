import React from 'react';
import Select from 'react-select';
import infoIcon from '../../assets/icons/info-icon.svg';

import './Sidebar.css';

function Sidebar(props) {

    const handleChangeForecast = event => {
        props.OnChangeForecast(event);
    };

    const handleChangeCrops = event => {
        props.OnChangeCrop(event);
    };

    const handleChangeScenario = event => {
        props.OnChangeScenario(event);
    };

    return (
      

            <div id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                <div className="accordion" id="accordion_sidebar">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="heading_filters">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_filters" aria-expanded="true" aria-controls="collapse_filters">
                                Filters
                            </button>
                        </h2>
                        <div id="collapse_filters" className="accordion-collapse collapse show" aria-labelledby="heading_filters" data-bs-parent="#accordion_sidebar">
                            <div className="accordion-body">
                                <div>
                                <img className="bd-placeholder-img rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" src={infoIcon}/>
                                <label htmlFor="cboForecast">Forecast:</label>
                                </div>
                                <Select id="cboForecast"
                                    options={props.opt_forecast}
                                    isSearchable={false}
                                    defaultValue={props.opt_forecast[0]}
                                    onChange={handleChangeForecast}
                                    placeholder={"Select"} />
                                <label htmlFor="cboCrop">Crop:</label>
                                <Select id="cboCrop"
                                    options={props.opt_crops}
                                    isSearchable={false}
                                    defaultValue={props.opt_crops[0]}
                                    onChange={handleChangeCrops}
                                    placeholder={"Select"} />
                                <label htmlFor="cboScenario">Scenario:</label>
                                <Select id="cboScenario"
                                    options={props.opt_scenarios}
                                    isSearchable={false}
                                    defaultValue={props.opt_scenarios[0]}
                                    onChange={handleChangeScenario}
                                    placeholder={"Select"} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        
    );
}

export default Sidebar;