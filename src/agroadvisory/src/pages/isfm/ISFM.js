import React from 'react'

import Sidebar from '../../components/sidebar/Sidebar';
import MapHeader from '../../components/map_header/MapHeader';
import Map from '../../components/map/Map';


function ISFM() {

    const opt_forecast = [{ label: "2022-07", value: "2022-07" }];
    const opt_crops = [{ label: "Wheat", value: "wheat" }];
    const opt_scenarios = [{ label: "Normal", value: "normal" }, { label: "Above", value: "above" }, { label: "Below", value: "below" }];
    const [map_init, setMap_init] = React.useState({ center: [9.3988271, 39.9405962], zoom: 6 });
    const [filters, setFilters] = React.useState({forecast: opt_forecast[0].value, crop: opt_crops[0].value, scenario: opt_scenarios[0].value});
 
    
   
    const changeForecast = event => {
        const changedFiltersValues = {
            ...filters,
            forecast: event.value
            
        }
        setFilters(changedFiltersValues);
    };

    const changeCrop = event => {
        const changedFiltersValues = {
            ...filters,
            crop: event.value
            
        }
        setFilters(changedFiltersValues);
    };

    const changeScenario = event => {
        const changedFiltersValues = {
            ...filters,
            scenario: event.value
            
        }
        setFilters(changedFiltersValues);
        //console.log(filters);
        
    };

    // const onFiltersChange = event => {
    //     const changedFiltersValues = {
    //         ...filters,
    //         lotes: value
            
    //     }
    //     setFilters(event);

    // }

    // React.useEffect(() => {
    //     setForecast(forecast);
    //     setCrop(crop);
    //     setScenario(scenario);

    // }, [forecast, crop, scenario]);
    
   
    return (
        
        <div>

        <div className='mt-3'>

            <h2 className="font-link text-center">ISFM advisories</h2>

            <p className="font-link-body">
            Inorganic fertilizer could be expensive and may not be affordable by smallholders or
                        it may not be accessible due to different logistical reasons. In addition, inorganic
                        fertilizer can be more productive and sustainable when integrated with other good agronomic practices.
                        Thus, this component of the NextGen tool provides location- and context- specific organic and soil
                        fertility management advisories.

            </p>
            
            <p className="font-link-body">
            Compost and vermi-compost (t/ha)
            </p>
        </div>

        <div style={{'position': 'relative'}}>

            <Sidebar opt_forecast={opt_forecast} opt_crops={opt_crops} opt_scenarios={opt_scenarios} OnChangeForecast={changeForecast} OnChangeCrop={changeCrop} OnChangeScenario={changeScenario}/>
            <Map id="map_organic_fertilizers" init={map_init} type={"compost"} crop={filters.crop} forecast={filters.forecast} scenario={filters.scenario} style={{height: '80vh'}} cuttable={true} downloadable={true} legend={true}/>
        </div>
    
        </div>
    );
}

export default ISFM;