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
import Chart from "react-apexcharts";
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
    const [chart, setChart] = React.useState();

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
            let kebeles;
            let ids = "";
            const suma = [
                    {
                        type: "63865d9f68c981103580abf0",
                        values: [
                            { s: 1, values: [0] },
                            [{ s: 2, values: [0] }],
                            [{ s: 3, values: [0] }],
                        ],
                    },
                    {
                        type: "63865ef468c981103580e666",
                        values: [
                            { s: 1, values: [0] },
                            [{ s: 2, values: [0] }],
                            [{ s: 3, values: [0] }],
                        ],
                    },
                    {
                        type: "638660ad68c98110358120dc",
                        values: [
                            { s: 1, values: [0] },
                            [{ s: 2, values: [0] }],
                            [{ s: 3, values: [0] }],
                        ],
                    },
                    {
                        type: "638662c668c9811035815b52",
                        values: [
                            { s: 1, values: [0] },
                            [{ s: 2, values: [0] }],
                            [{ s: 3, values: [0] }],
                        ],
                    },
                    {
                        type: "6386653e68c98110358195c8",
                        values: [
                            { s: 1, values: [0] },
                            [{ s: 2, values: [0] }],
                            [{ s: 3, values: [0] }],
                        ],
                    },
                ];
            const risks = {};
            axios
                .get(Configuration.get_url_api_base() + "adm4/" + reportInput.woreda[0])
                .then(async (response) => {
                    kebeles = response.data;
                    setKebeles(response.data);
                    if (kebeles.length > 0) {
                        kebeles.map((dato, i) => {
                            if (i == kebeles.length - 1)
                                ids += dato.id;
                            else
                                ids += `${dato.id},`;
                        });
                        await axios
                          .get(Configuration.get_url_api_base() + "metrics/" + ids)
                          .then((response) => {
                            response.data.map((kebele) => {
                              const aux = suma.filter(ar => ar.type === kebele.type);
                              aux[0].values[0].values[0] +=
                                kebele.values[0].values[0] / kebeles.length;
                              aux[0].values[1][0].values[0] +=
                                kebele.values[1][0].values[0] / kebeles.length;
                              aux[0].values[2][0].values[0] +=
                                kebele.values[2][0].values[0] / kebeles.length;
                            });
                          });
                        await axios
                            .get(Configuration.get_url_api_base() + "risk/" + ids)
                            .then((response) => {
                                //console.log("risk", response.data)
                                if(response.data.length > 0){
                                    response.data.map((dato) => {
                                        if (risks[dato.risk.values[0]])
                                            risks[dato.risk.values[0]] += 1;
                                        else
                                            risks[dato.risk.values[0]] = 1;
                                    })
                                    const chart = {
                                        series: [{
                                            name: 'Kebeles count',
                                            data: Object.values(risks)
                                        }],
                                        options: {
                                            chart: {
                                                height: 350,
                                                type: 'bar'
                                            },
                                            colors: Object.keys(risks).map(name => {
                                                return name == "High risk" ? "#dc3545" : "#fd7e14"
                                            }),
                                            plotOptions: {
                                                bar: {
                                                    columnWidth: '40%',
                                                    distributed: true,
                                                }
                                            },
                                            dataLabels: {
                                                enabled: false
                                            },
                                            legend: {
                                                show: false
                                            },
                                            xaxis: {
                                                categories: Object.keys(risks),
                                                labels: {
                                                    style: {
                                                        colors: null,
                                                        fontSize: '12px'
                                                    }
                                                }
                                            },
                                            yaxis: {
                                                title: {
                                                    text: 'Kebeles'
                                                }
                                            },
                                        },
                                    };
                                    setChart(chart)
                                }
                                setLoad(true);
                            });
                    } else setLoad(true);
                });
            setBarChartData(suma);
        }
    }, []);

    // Generate the pdf based on a component
    const createPDF = async () => {
        let orientacion;
        if (window.screen.width < 1200) {
            orientacion = "p";
        } else {
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
                                    { reportInput.ad_optimal && 
                                        <BarChartYield
                                            name={"Optimal yield"}
                                            data={[barChartData[2]]}
                                        />
                                    }
                                    {reportInput.ad_fertilizer &&
                                        <>
                                            <BarChartFert
                                                name={"Fertilizer rate"}
                                                data={[barChartData[1], barChartData[3]]}
                                            />
                                            <BarChartFert
                                                name={"Fertilizer rate (ISFM)"}
                                                data={[barChartData[0], barChartData[4]]}
                                            />
                                        </>
                                    }
                                    {
                                        reportInput.ad_risk && chart &&
                                            <div
                                                className="card col-12 col-md-5 my-1"
                                                key="bar_chart_risk"
                                                style={{ minWidth: "49%" }}
                                            >
                                                <div className="card-body">
                                                    <h5 className="card-title">Risk</h5>
                                                    <Chart options={chart.options} series={chart.series} type="bar" height={300} />
                                                </div>
                                            </div>

                                    }
                                    
                                </div>
                                <div  className="alert alert-light my-3 border" role="alert">
                                    <h5>Notes: </h5>
                                    <ol>
                                        <li>This advisory is for agricultural land allotted to wheat in 2022 main crop season only.</li>
                                        <li>If there is no sufficient inorganic fertilizer supply, use half inorganic with half organic rates.</li>
                                    </ol>
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
