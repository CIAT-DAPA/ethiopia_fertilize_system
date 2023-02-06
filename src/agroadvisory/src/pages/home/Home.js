import React, { useState, useEffect } from 'react';
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

//redux
import { useDispatch } from 'react-redux';
const bbox = require('geojson-bbox');

function Home() {
    const [map_init, setMap_init] = React.useState({ center: [9.8088271, 38.0405962], zoom: 5.75 });
    const [selectsValues, setSelectsValues] = React.useState(null);
    const [disabledSelect, setDisabledSelect] = React.useState({ z: true, w: true, k: true, b: true });
    const [geoJson, setGeoJson] = React.useState();
    const [forWoreda, setForWoreda] = React.useState(false);
    const [bounds, setBounds] = React.useState([[10, 33], [8.5, 48],])
    const [loading, setloading] = useState({ r: "pending", z: "pending", w: "pending", k: "pending" });
    const [param, setParam] = useState()


    const [formValues, setFormValues] = useState({
        type: "kebele",
        region: null,
        zone: null,
        woreda: null,
        kebele: null,
        ad_fertilizer: true,
        ad_aclimate: true,
        ad_risk: true,
        ad_optimal: true

    });

    const dispatch = useDispatch();

    //initial load of the regions
    useEffect(() => {
        setloading({ ...loading, r: "loading"})
        axios.get(Configuration.get_url_api_base() + "adm1")
        .then(response => {
            setSelectsValues({ ...selectsValues, regions: response.data })
            setloading({ ...loading, r: "pending"})
        });
    }, [!selectsValues])
    
    // change of region
    useEffect(() => {
        if (formValues.region){
            setDisabledSelect({ z: true, w: true, k: true, b: true })
            setloading({ ...loading, z: "loading"})
            axios.get(Configuration.get_url_api_base() + "adm2/" + formValues.region[0])
            .then(response => {
                setSelectsValues({ ...selectsValues, zones: response.data })
                setloading({ r: "uploaded", z: "pending", w: "pending", k: "pending"})
                setDisabledSelect({ z: false, w: true, k: true, b: true })
            });
        }
    }, [formValues?.region])

    //change of zone
    useEffect(() => {
        if (formValues.zone){
            setDisabledSelect({ ...disabledSelect, w: true, k: true, b: true });
            setloading({ ...loading, w: "loading"})
            axios.get(Configuration.get_url_api_base() + "adm3/" + formValues.zone[0])
            .then(response => {
                setSelectsValues({ ...selectsValues, woredas: response.data })
                setloading({ ...loading, z: "uploaded", w: "pending", k: "pending"})
                setDisabledSelect({ ...disabledSelect, w: false, k: true, b: true});
            });
        }
    }, [formValues.zone])

    // change of woreda
    useEffect(() => {
        if (formValues.woreda){
            setDisabledSelect({ ...disabledSelect, k: true, b: true });
            setloading({ ...loading, k: "loading"})
            axios.get(Configuration.get_url_api_base() + "adm4/" + formValues.woreda[0])
            .then(response => {
                setSelectsValues({ ...selectsValues, kebeles: response.data })
                setloading({ ...loading, k: "pending", w: "uploaded"})
                setDisabledSelect({ ...disabledSelect, k: false, b: true });
            });
        }
    }, [formValues.woreda])

    // status icons
    const icon = (statu) => {
        switch (statu) {
            case "pending":
                return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                </svg>)

            case "loading":
                return <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

            case "uploaded":
                return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>)
            default:
                return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bug" viewBox="0 0 16 16">
                    <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
                </svg>)
        }
    }
    
    

    const onFormSubmit = (e) => {
        e.preventDefault();
        //dispatch(setReportInput({formValues}));

    }

    const onChangeRegion = (e) => {
        GeoFeatures.geojsonRegion(e[2]).then((data_geo) => {
            setGeoJson(data_geo);
            onChangeBounds(data_geo);
        });
        setParam(e[2]);
    }
    const onChangeZone = (e) => {
        GeoFeatures.geojsonZone(e[2]).then((data_geo) => {
            setGeoJson(data_geo);
            onChangeBounds(data_geo);
        });
        setParam(e[2]);
    }
    const onChangeWoreda = (e) => {
        GeoFeatures.geojsonWoreda(e[2]).then((data_geo) => {
            setGeoJson(data_geo);
            onChangeBounds(data_geo);
        });
        setParam(e[2]);
    }
    const onChangeKebele = (e) => {
        GeoFeatures.geojsonKebele(e[2]).then((data_geo) => {
            setGeoJson(data_geo);
            onChangeBounds(data_geo);
        });
        setParam(e[2]);
    }

    //change of bounds for autozoom
    const onChangeBounds = data_geo => {
        try {
            if (data_geo.totalFeatures > 0) {
                const extent = bbox(data_geo);
                setBounds([
                    [extent[1], extent[0]],
                    [extent[3], extent[2]],
                ]);
            }

        } catch (error) {
            console.log('error wiht bounds: ', error)
        }

    }

    const Alert = () => {
        return (
            <div className="alert alert-primary mt-4" role="alert">
                You must select a {forWoreda ? 'Woreda' : 'Kebele'}
            </div>
        )
    }

    const setType = e => {
        setForWoreda(e);
        if ( e )
            setFormValues({ ...formValues, type: "woreda", ad_aclimate: false })
        else
            setFormValues({ ...formValues, type: "kebele", ad_aclimate: true })
    }

    const verify = () => {
        return (!(formValues.ad_aclimate || formValues.ad_fertilizer || formValues.ad_optimal || formValues.ad_risk) 
        ||  (forWoreda ? disabledSelect.k : disabledSelect.b) )
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
                        <input type="checkbox" checked={forWoreda} onChange={e => setType(e.target.checked)} />
                        <span className="slider round"></span>
                    </label>
                    Report for Woreda
                </div>

                <div className='row row-content my-4 font-link-body'>
                    <form className='col-md-6' onSubmit={onFormSubmit}>
                        <p className='mb-0'>Choose a location</p>
                        <div className='row form-group'>
                            <div className='col-md-6 mt-3'>
                                <b>Region</b>
                                <div className='input-group'>
                                <select className="form-select" aria-label="Disabled select example"  onChange={e => { setFormValues({ ...formValues, region: e.target.value.split(","), zone: null, woreda: null, kebele: null }); onChangeRegion(e.target.value.split(",")) }}>
                                    <option key={"region default"} value={null}>Select a region</option>
                                    {
                                        selectsValues?.regions && selectsValues?.regions.map((currentRegion) => <option key={currentRegion.id} value={[currentRegion.id, currentRegion.name, currentRegion.ext_id]}>{currentRegion.name}</option>)
                                    }
                                </select>
                                    <span className='input-group-text'>
                                        { icon(loading.r)}
                                    </span>
                                </div>
                            </div>
                            <div className='col-md-6 mt-3'>
                                <b>Zone</b>
                                <div className='input-group'>
                                    <select className="form-select" aria-label="Disabled select example" disabled={disabledSelect.z} onChange={e => { setFormValues({ ...formValues, zone: e.target.value.split(","), woreda: null, kebele: null }); onChangeZone(e.target.value.split(",")) }}>
                                        <option key={"zone default"} value={null}>Select a zone</option>
                                        {
                                            selectsValues?.zones && selectsValues?.zones.map((currentZone) => <option key={currentZone.id} value={[currentZone.id, currentZone.name, currentZone.ext_id]}>{currentZone.name}</option>)
                                        }
                                    </select>
                                    <span className='input-group-text'>
                                        { icon(loading.z)}
                                    </span>
                                </div>
                            </div>
                            <div className='col-md-6 mt-3'>
                                <b>Woreda</b>
                                <div className='input-group'>
                                <select className="form-select" aria-label="Disabled select example" disabled={disabledSelect.w} onChange={e => { setFormValues({ ...formValues, woreda: e.target.value.split(","), kebele: null }); onChangeWoreda(e.target.value.split(",")) }}>

                                    <option key={"woreda default"} value={null}>Select a woreda</option>

                                    {
                                        selectsValues?.woredas && selectsValues?.woredas.map((currentWoreda) => <option key={currentWoreda.id} value={[currentWoreda.id, currentWoreda.name, currentWoreda.ext_id]}>{currentWoreda.name}</option>)
                                    }
                                </select>
                                    <span className='input-group-text'>
                                        { icon(loading.w)}
                                    </span>
                                </div>

                            </div>
                            <div className='col-md-6 mt-3'>
                                <b>Kebele</b>
                                <div className='input-group'>
                                <select className="form-select" aria-label="Disabled select example" disabled={disabledSelect.k || forWoreda} onChange={e => { setFormValues({ ...formValues, kebele: e.target.value.split(",") }); setDisabledSelect({ ...disabledSelect, b: false }); onChangeKebele(e.target.value.split(","), setloading({ ...loading, k: "uploaded"}))/*GeoFeatures.geojson("'"+e.target.value.split(",")[1]+"'").then((data_geo) => {setGeoJson(data_geo)});*/ }}>
                                {/*<select className="form-select" aria-label="Disabled select example" disabled={disabledSelect.k} onChange={e => { setFormValues({ ...formValues, kebele: e.target.value.split(",") }); setDisabledSelect({ ...disabledSelect, b: false });; onChangeKebele(e.target.value.split(",")) /*GeoFeatures.geojson("'"+e.target.value.split(",")[1]+"'").then((data_geo) => {setGeoJson(data_geo)}); }}> */}
                                    <option key={"kebele default"} value={null}>Select a kebele</option>

                                    {
                                        selectsValues?.kebeles && selectsValues?.kebeles.map((currentKebele) => <option key={currentKebele.id} value={[currentKebele.id, currentKebele.name, currentKebele.ext_id, currentKebele.aclimate_id]}>{currentKebele.name}</option>)
                                    }
                                </select>
                                    <span className='input-group-text'>
                                        { icon(loading.k)}
                                    </span>
                                </div>

                            </div>

                            <div className="row mt-4">
                                <div className='col-lg-6 col-md-12 col-sm-6'>
                                    <input className="form-check-input me-2" type="checkbox" checked={formValues.ad_fertilizer} id="ad_fertilizer" onChange={e => setFormValues({ ...formValues, ad_fertilizer: e.target.checked })}/>
                                    <label className="form-check-label" htmlFor="ad_fertilizer">
                                        Advisory Fertilizer
                                    </label>

                                </div>
                                <div className='col-lg-6 col-md-12 col-sm-6'>
                                    <input className="form-check-input me-2" type="checkbox" checked={formValues.ad_optimal} id="ad_optimal" onChange={e => setFormValues({ ...formValues, ad_optimal: e.target.checked })}/>
                                    <label className="form-check-label" htmlFor="ad_optimal">
                                        Advisory Optimal Yield
                                    </label>

                                </div>
                            </div>
                            <div className="row ">
                                <div className='col-lg-6 col-md-12 col-sm-6'>
                                    <input className="form-check-input me-2" type="checkbox" checked={formValues.ad_risk} id="ad_risk" onChange={e => setFormValues({ ...formValues, ad_risk: e.target.checked })}/>
                                    <label className="form-check-label" htmlFor="ad_risk">
                                        Advisory Risk
                                    </label>

                                </div>
                                <div className='col-lg-6 col-md-12 col-sm-6' style={forWoreda ? { display:'none'} : {}}>
                                    <input className="form-check-input me-2" type="checkbox" checked={formValues.ad_aclimate} id="ad_aclimate" onChange={e => setFormValues({ ...formValues, ad_aclimate: e.target.checked })} disabled={forWoreda}/>
                                    <label className="form-check-label" htmlFor="ad_aclimate">
                                        Advisory Aclimate
                                    </label>

                                </div>
                            </div> 
                            {!(formValues.ad_aclimate || formValues.ad_fertilizer || formValues.ad_optimal || formValues.ad_risk) &&
                                <div className="alert alert-danger mt-4" role="alert">
                                    You must select at least one layer of information
                                </div>
                            }

                            </div>



                            <div className='row'>
                                {
                                    (forWoreda ? disabledSelect.k : disabledSelect.b)
                                        && <Alert />
                                }
                                <Link className='col d-flex justify-content-center mt-4 mb-4' to={forWoreda ? "/report_woreda" : "/report"} style={ verify() ? { "pointerEvents":'none'} : {}} >
                                    <button type="submit" className="btn btn-primary" disabled={verify()} onClick={e => { dispatch(setReportInput({ formValues })); }}>Advisory</button>
                                </Link>
                            </div>
                    </form>
                    <div className='col-md-6'>
                        {/* {geoJson ?
                            <Map id="location_report" init={map_init} type={"location_report"} geo={geoJson} bounds={bounds}/> : */}
                            <Map id="location" init={map_init} bounds={bounds} type={"location"} style={{ height: '450px' }} zoomOnGeojson={map_init} cuttable={false} checked={true} param={param} region={formValues.region} zone={formValues.zone} kebele={formValues.kebele} woreda={formValues.woreda} />
                        {/* } */}

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