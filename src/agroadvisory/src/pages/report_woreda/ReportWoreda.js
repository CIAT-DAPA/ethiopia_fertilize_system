import React from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import { useSelector } from "react-redux";

import "./ReportWoreda.css";
import Map from "../../components/map/Map";
import GeoFeatures from "../../services/GeoFeatures";
import ColumnChart from "../../components/chart/ColumnChart";
import Configuration from "../../conf/Configuration";
const bbox = require("geojson-bbox");

function ReportWoreda() {
    const reportInput = useSelector((state) => state.report);

    const [map_init, setMap_init] = React.useState({
        center: [9.3988271, 39.9405962],
        zoom: 5,
    });
    const [bounds, setBounds] = React.useState([
        [10, 30],
        [8.5, 50],
    ]);
    const [geoJson, setGeoJson] = React.useState();
    const [barChartData, setBarChartData] = React.useState();
    const [load, setLoad] = React.useState(false);
    const [kebeles, setKebeles] = React.useState();

    React.useEffect(() => {
        setLoad(false);
        if (reportInput.woreda) {
            GeoFeatures.geojsonWoreda("'" + reportInput.woreda[2] + "'").then(
                (data_geo) => {
                    const extent = bbox(data_geo);
                    setBounds([
                        [extent[1], extent[0]],
                        [extent[3], extent[2]],
                    ]);
                    setGeoJson(data_geo);
                }
            );

            let kebeles,
                ids = "";
            const values = [],
                suma = [];
            axios
                .get(Configuration.get_url_api_base() + "adm4/" + reportInput.woreda[0])
                .then((response) => {
                    kebeles = response.data;
                    setKebeles(response.data);
                    if (kebeles.length > 0) {
                        kebeles.map((dato, i) => {
                            if (i == kebeles.length-1)
                                ids += dato.id;
                            else
                                ids += `${dato.id},`;
                        })
                        kebeles.map(async (dato, index) => {
                            //console.log(`este es el id de ${dato.name}`,dato.id)
                            
                            await axios
                                .get(Configuration.get_url_api_base() + "metrics/" + dato.id)
                                .then((response) => {
                                    values.push(response.data);
                                    response.data.map((datito, i) => {
                                        if (suma[i]) {
                                            suma[i].values[0].values[0] +=
                                                datito.values[0].values[0] / kebeles.length;
                                            suma[i].values[1][0].values[0] +=
                                                datito.values[1][0].values[0] / kebeles.length;
                                            suma[i].values[2][0].values[0] +=
                                                datito.values[2][0].values[0] / kebeles.length;
                                        } else {
                                            suma[i] = JSON.parse(JSON.stringify(datito));
                                            suma[i].values[0].values[0] /= kebeles.length;
                                            suma[i].values[1][0].values[0] /= kebeles.length;
                                            suma[i].values[2][0].values[0] /= kebeles.length;
                                        }
                                        if (i == suma.length - 1 && index == kebeles.length - 1)
                                            setLoad(true);
                                    });
                                });
                        });
                    } else setLoad(true);
                });

            console.log(ids);
            console.log(values);

            setBarChartData(suma);
            console.log("suma", suma);
        }
    }, []);

    // Generate the pdf based on a component
    const createPDF = async () => {
        let orientacion;
        if (window.screen.width < 1200) {
            //console.log("Pequeña")
            orientacion = "p";
        } else {
            //console.log("Grande")
            orientacion = "l";
        }

        let html = document.querySelector("#report");
        let report = new JsPDF(orientacion, "px", [
            html.offsetWidth + 40,
            html.offsetHeight + 40,
        ]);
        const canvas = await html2canvas(html, {
            useCORS: true,
            scale: 1,
            allowTaint: true,
        });
        const img = canvas.toDataURL("image/png");
        report.addImage(img, "JPEG", 10, 10, html.offsetWidth, html.offsetHeight);
        report.save("report.pdf");
    };

    const Location = () => {
        return (
            <div className="card col-12 col-lg-5 my-1" style={{ minWidth: "49%" }}>
                <div className="card-body">
                    <h5 className="card-title">Location</h5>
                    {geoJson && (
                        <Map
                            id="location_report"
                            init={map_init}
                            type={"location_report"}
                            geo={geoJson}
                            style={{ height: "50vh" }}
                            bounds={bounds}
                        />
                    )}
                </div>
            </div>
        );
    };

    const BarChartFert = ({ name, data }) => {
        return (
            <div
                className="card col-12 col-md-5 my-1"
                key={"bar_chart_" + name}
                style={{ minWidth: "49%" }}
            >
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <ColumnChart data={data} type={"fertilizer_rate"} />
                </div>
            </div>
        );
    };

    const BarChartYield = ({ name, data }) => {
        return (
            <div
                className="card col-12 col-md-5 my-1"
                key={"bar_chart_yield"}
                style={{ minWidth: "49%" }}
            >
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <ColumnChart data={data} type={"optimal_yield"} />
                </div>
            </div>
        );
    };

    const Spinners = () => {
        return (
            <div
                className="col-12 d-flex justify-content-evenly m-4"
                style={{ backgroundColor: "white" }}
                key={"spinners"}
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    };

    return (
        <main>
            {reportInput.woreda ? (
                <>
                    <br />
                    <section className="container">
                        <div className="d-flex font-link">
                            <h3>
                                Woreda report: <b>{reportInput.woreda[1]}</b>{" "}
                            </h3>
                        </div>
                        <div>
                            <button
                                onClick={createPDF}
                                type="button"
                                className="btn btn-primary"
                            >
                                Export
                            </button>
                        </div>
                        {!load ? (
                            <Spinners />
                        ) : kebeles.length > 0 ? (
                            <div id="report">
                                <div className="row my-3 g-8 row-cols-auto justify-content-between">
                                    <Location />
                                    <BarChartYield
                                        name={"Optimal yield"}
                                        data={[barChartData[2]]}
                                    />
                                    <BarChartFert
                                        name={"Fertilizer rate"}
                                        data={[barChartData[1], barChartData[3]]}
                                    />
                                    <BarChartFert
                                        name={"Fertilizer rate (ISFM)"}
                                        data={[barChartData[0], barChartData[4]]}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div
                                className="alert alert-warning mt-4 text-center"
                                role="alert"
                            >
                                The selected Woreda has no kebeles regristred
                            </div>
                        )}
                    </section>
                </>
            ) : (
                <div className="alert alert-danger mt-4 text-center" role="alert">
                    You have not selected a Woreda, go back to the beginning to select
                    one.
                </div>
            )}
        </main>
    );
}

export default ReportWoreda;
