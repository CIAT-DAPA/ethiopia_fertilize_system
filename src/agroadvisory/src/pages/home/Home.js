import React from 'react';
import axios from "axios";
import center from "@turf/center";
import { Link } from 'react-router-dom'

import './Home.css';
import landscape from '../../assets/images/landscape.jpg';
import soil_climate_specific from '../../assets/images/soil_climate_specific.jpg';
import season_specific from '../../assets/images/season_specific.jpg';
import segmentation from '../../assets/images/segmentation.jpg';
import Map from '../../components/map/Map';
import Configuration from "../../conf/Configuration";
import GeoFeatures from '../../services/GeoFeatures';

import { setReportInput } from '../../slices/reportSlice';

import { useState } from 'react';

//redux
import { useDispatch } from 'react-redux';
const bbox = require('geojson-bbox');

function Home() {
    const [map_init, setMap_init] = React.useState({ center: [9.3988271, 39.9405962], zoom: 5 });
    const [selectsValues, setSelectsValues] = React.useState(null);
    const [disabledSelect, setDisabledSelect] = React.useState({ z: true, w: true, k: true, b: true });
    const [geoJson, setGeoJson] = React.useState();
    const [forWoreda, setForWoreda] = React.useState(false);
    //const [disabledSelect, setDisabledSelect] = React.useState({ z: true, w: true, k: true, b: true });
    //const [geoJson, setGeoJson] = React.useState(null);
    //const [bounds, setBounds] = React.useState([ [10, 30],  [8.5, 50],])


    const [formValues, setFormValues] = useState({
        type: null,
        region: null,
        zone: null,
        woreda: null,
        kebele: null,
        ad_fertilizer: null,
        ad_aclimate: null,
        ad_isfm: null

    });

    const dispatch = useDispatch();

    React.useEffect(() => {
        //Regions
        if (!selectsValues) {
            axios.get(Configuration.get_url_api_base() + "adm1")
                .then(response => {
                    setSelectsValues({ ...selectsValues, regions: response.data })


                });

        }
        if (formValues.region) {
            //Zones
            axios.get(Configuration.get_url_api_base() + "adm2/" + formValues.region[0])
                .then(response => {

                    setSelectsValues({ ...selectsValues, zones: response.data })


                });

        }

        if (formValues.zone) {
            //Woredas
            axios.get(Configuration.get_url_api_base() + "adm3/" + formValues.zone[0])
                .then(response => {

                    setSelectsValues({ ...selectsValues, woredas: response.data })


                });

        }

        if (formValues.woreda) {
            //Kebeles
            axios.get(Configuration.get_url_api_base() + "adm4/" + formValues.woreda[0])
                .then(response => {
                    console.log(response)
                    setSelectsValues({ ...selectsValues, kebeles: response.data })
                });

        }

        // if(geoJson){
        //     console.log(geoJson);
        //     var features = ([
        //         [ 39.74409621, 13.35065102 ]
        //       ]);

        //     var center = center(geoJson);
        //     console.log(center)

        // }


    }, [formValues]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        //dispatch(setReportInput({formValues}));

    }

    const onChangeRegion = (e) => {
        GeoFeatures.geojsonRegion("'" + e[2] + "'").then((data_geo) => {
            setGeoJson(data_geo);
        });
    }

    const onChangeZone = (e) => {
        GeoFeatures.geojsonZone("'" + e[2] + "'").then((data_geo) => {
            setGeoJson(data_geo);
        });
    }

    const onChangeWoreda = (e) => {
        GeoFeatures.geojsonWoreda("'" + e[2] + "'").then((data_geo) => {
            setGeoJson(data_geo);
        });
    }

    const onChangeKebele = (e) => {
        GeoFeatures.geojsonKebele("'" + e[2] + "'").then((data_geo) => {
            setGeoJson(data_geo);
        });
    }

    const Alert = () => {
        return (
            <div className="alert alert-primary mt-4" role="alert">
                You must select a {forWoreda ? 'Woreda' : 'Kebele'}
            </div>
        )
    }

    return (
        <main>
            <br />

            <div className='container'>
                <div className='row'>
                    <div className='col'>

                        <h1 className='font-link text-center'><b>NextGen Agroadvisory</b></h1>
                        <p className='font-link-body'>
                            NextGenAgroadvisory is a project designed to develop location-, context-, and climate- specific agricultural
                            advisories particularly related to optimal fertilizer application, integrated soil fertility management (ISFM),
                            climate information service, climate smart agricultural activities (CSA), pest and disease surveillance, and other
                            agricultural investments in Ethiopia. It is a project by the Alliance of Bioversity International and the International
                            Center for Tropical Agriculture (CIAT) in partnership with support of SSHI (BMGF), EiA (oneCGIAR initiative),
                            AICCRA (World Bank), and SI-MFS (oneCGIAR initiative).
                        </p>



                    </div>

                </div>

                <div>
                    <label className="switch">
                        <input type="checkbox" checked={forWoreda} onChange={e => setForWoreda(e.target.checked)} />
                        <span className="slider round"></span>
                    </label>
                    Report for Woreda
                </div>

                <div className='row row-content mt-5 font-link-body'>
                    <form className='col-6' onSubmit={onFormSubmit}>
                        <p>Choose a location</p>
                        <div className='row form-group'>
                            <div className='col-6'>
                                <b>Region</b>
                                <select className="form-select" aria-label="Disabled select example" onChange={e => { setDisabledSelect({ ...disabledSelect, z: false, w: true, k: true }); setFormValues({ ...formValues, region: e.target.value.split(","), zone: null, woreda: null, kebele: null }); onChangeRegion(e.target.value.split(",")) }}>
                                    <option key={"region default"} value={null}>Select a region</option>

                                    {
                                        selectsValues?.regions && selectsValues?.regions.map((currentRegion) => <option key={currentRegion.id} value={[currentRegion.id, currentRegion.name, currentRegion.ext_id]}>{currentRegion.name}</option>)
                                    }
                                </select>

                            </div>
                            <div className='col-6'>
                                <b>Zone</b>
                                <select className="form-select" aria-label="Disabled select example" disabled={disabledSelect.z} onChange={e => { setDisabledSelect({ ...disabledSelect, w: false, k: true }); setFormValues({ ...formValues, zone: e.target.value.split(","), woreda: null, kebele: null }); onChangeZone(e.target.value.split(",")) }}>


                                    <option key={"zone default"} value={null}>Select a zone</option>

                                    {
                                        selectsValues?.zones && selectsValues?.zones.map((currentZone) => <option key={currentZone.id} value={[currentZone.id, currentZone.name, currentZone.ext_id]}>{currentZone.name}</option>)
                                    }
                                </select>

                            </div>
                            <div className='col-6 mt-4'>
                                <b>Woreda</b>
                                <select className="form-select" aria-label="Disabled select example" disabled={disabledSelect.w} onChange={e => { setDisabledSelect({ ...disabledSelect, k: false }); setFormValues({ ...formValues, woreda: e.target.value.split(","), kebele: null }); onChangeWoreda(e.target.value.split(",")) }}>

                                    <option key={"woreda default"} value={null}>Select a woreda</option>

                                    {
                                        selectsValues?.woredas && selectsValues?.woredas.map((currentWoreda) => <option key={currentWoreda.id} value={[currentWoreda.id, currentWoreda.name, currentWoreda.ext_id]}>{currentWoreda.name}</option>)
                                    }
                                </select>

                            </div>
                            <div className='col-6 mt-4'>
                                <b>Kebele</b>
                                <select className="form-select" aria-label="Disabled select example" disabled={disabledSelect.k || forWoreda} onChange={e => { setFormValues({ ...formValues, kebele: e.target.value.split(",") }); setDisabledSelect({ ...disabledSelect, b: false }); onChangeKebele(e.target.value.split(","))/*GeoFeatures.geojson("'"+e.target.value.split(",")[1]+"'").then((data_geo) => {setGeoJson(data_geo)});*/ }}>
                                {/*<select className="form-select" aria-label="Disabled select example" disabled={disabledSelect.k} onChange={e => { setFormValues({ ...formValues, kebele: e.target.value.split(",") }); setDisabledSelect({ ...disabledSelect, b: false });; onChangeKebele(e.target.value.split(",")) /*GeoFeatures.geojson("'"+e.target.value.split(",")[1]+"'").then((data_geo) => {setGeoJson(data_geo)}); }}> */}
                                    <option key={"kebele default"} value={null}>Select a kebele</option>

                                    {
                                        selectsValues?.kebeles && selectsValues?.kebeles.map((currentKebele) => <option key={currentKebele.id} value={[currentKebele.id, currentKebele.name, currentKebele.ext_id]}>{currentKebele.name}</option>)
                                    }
                                </select>

                            </div>

                            {/* <div className="row form-check mt-4">
                                <div className='col 12'>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={e => setFormValues({ ...formValues, ad_fertilizer: e.target.checked })}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Advisory Fertilizer
                                    </label>

                                </div>
                            </div>
                            <div className="row form-check">
                                <div className='col 12'>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={e => setFormValues({ ...formValues, ad_aclimate: e.target.checked })}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Advisory Aclimate
                                    </label>

                                </div>
                            </div>
                            <div className="row form-check">
                                <div className='col 12'>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={e => setFormValues({ ...formValues, ad_isfm: e.target.checked })}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Advisory ISFM
                                    </label>

                                </div>
                            </div> */}

                            </div>



                            <div className='row'>
                                {

                                    !disabledSelect.b || (forWoreda && !disabledSelect.k)
                                        ? <Link className='col d-flex justify-content-center mt-4 mb-4' to={forWoreda ? "/report_woreda" : "/report"}>
                                            <button type="submit" className="btn btn-primary" disabled={forWoreda ? disabledSelect.k : disabledSelect.b} onClick={e => { dispatch(setReportInput({ formValues })); }}>Advisory</button>
                                        </Link>
                                        :
                                        <div>
                                            <Alert />
                                            <div className='d-flex justify-content-center mt-4 mb-4'>
                                                <button type="submit" className={"btn btn-primary"} disabled={disabledSelect.b}>Advisory</button>

                                            </div>
                                        </div>

                                }



                            </div>
                    </form>
                    <div className='col-6'>
                        {geoJson ?
                            <Map id="location_report" init={map_init} type={"location_report"} geo={geoJson} /> :
                            <Map id="location_report" init={map_init} type={"location_report"} style={{ height: '300px' }} zoomOnGeojson={map_init} cuttable={false} />
                        }

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



        </main>
    );
}

export default Home;