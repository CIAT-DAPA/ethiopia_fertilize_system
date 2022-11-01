import React from 'react';
import './Report.css'

import MapHeader from '../../components/map_header/MapHeader';
import Map from '../../components/map/Map';

function Report() {

    const Location = () => {
        return(
            <div className='col'>
                    <MapHeader title={"Location"} />
            </div>

        )

    }

    const NutrientsAndYield = () => {
        return(
            <div className='col'>
                    <MapHeader title={"Nutrients and Yield"} />
            </div>

        )

    }

    const SeasonalDominant = () => {
        return(
            <div className='col'>
                    <MapHeader title={"Seasonal dominant"} />
            </div>

        )

    }

    return(
        <main>
            <br />
            <section className='container'>
                <div className="d-flex justify-content-between">
                    <h4>Report</h4>
                    <button type="button" class="btn btn-primary">Export</button>
                </div>
                    
                <div className='row'>
                        <Location/>
                        <NutrientsAndYield/>
                        <SeasonalDominant/>    
                </div>

            </section>
            
                

            
        </main>
    )

}

export default Report;