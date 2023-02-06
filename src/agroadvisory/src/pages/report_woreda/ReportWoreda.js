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
        let html = document.querySelector('#report')
        console.log(html.offsetWidth, html.offsetHeight)
        let report = new JsPDF('p', 'px', [ html.offsetHeight + 50, html.offsetWidth + 50]);
        const canvas = await html2canvas(html, {
            useCORS: true,
            allowTaint: true,
            onrendered: function (canvas) {
                document.body.appendChild(canvas);
    
            }
        })
        const img = canvas.toDataURL("image/png");
        report.addImage(img, 'JPEG', 20, 20, html.offsetWidth, html.offsetHeight);
        report.save(`Report_Woreda_${reportInput.woreda[1]}.pdf`);
    };

    const Location = ({id}) => {

        let name = "";
        
        switch (id) {
            case "recommendation_report":
                    name= "Optimal yield map"
                break;
            case "nps_urea_report":
                    name="Fertilizer rate map"
                break;
            case "compost_report":
                    name="Fertilizer rate map (ISFM)"
                break;
            default:
                name = "Location"
                break;
        }

        return (
            <div className="card col-12 col-lg-5 my-1" style={{ minWidth: id === "location_report" ? "100%" : "49%", maxHeight: "445.33px" }}>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    {geoJson && (
                        <Map
                            crop="wheat"
                            scenario="normal"
                            id={id}
                            init={map_init}
                            type={id}
                            geo={geoJson}
                            style={{
                                height: "90%",
                                minHeight: id === "location_report" ? "370px" : "312.29px"
                            }}
                            bounds={bounds}
                            legend={id !== "location_report"}
                            styleGeojson={id !== "location_report" && { fillOpacity: 0, color: "red" }}
                        />
                    )}
                </div>
            </div>
        );
    };

    const BarChartFert = ({ name, data, tooltip }) => {
        return (
            <div
                className="card col-12 col-md-5 my-1"
                key={"bar_chart_" + name}
                style={{ minWidth: "49%" }}
            >
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    {tooltip}
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
                                Woreda report: <b>{reportInput.woreda[1]}</b>
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
                                    <Location id="location_report"/>
                                    { reportInput.ad_optimal && 
                                        <>
                                        <BarChartYield
                                            name={"Optimal yield"}
                                            data={[barChartData[2]]}
                                        />
                                        <Location id="recommendation_report" />
                                        </>
                                    }
                                    {reportInput.ad_fertilizer &&
                                        <>
                                            <div className="alert alert-light my-3 border" role="alert">
                                                <p className="font-link-body text-justify">
                                                    Integrated Soil Fertility Management (ISFM) in this study address the integrated use of inorganic fertilizers with organic fertilizer such as verm-icompost, compost, manure, and bio-slurry with a set of locally adapted soil fertility technologies and improved agronomic practices promoted to enhance soil fertility, crop productivity and incomes of smallholder farmers. For this purpose, we developed site-specific recommendations integrated use of organic fertilizer with inorganic fertilizer for profitable wheat production in Ethiopia.
                                                </p>
                                                <p className="font-link-body text-justify">
                                                    Urea is the most concentrated solid nitrogen fertilizer which contain 46% nitrogen and no other plant nutrients. It is the most common fertilizer used as a source of nitrogen in Ethiopia. When it is worked into the soil, it is as effective as any other nitrogen fertilizer and is most efficiently utilized on soils with adequate moisture content, so that the gaseous ammonia can go quickly into solution. In the soil, urea changes to ammonium carbonate which may temporarily cause a harmful local high pH and its use need smart management practices such as split application to allow efficient uptake by plant.
                                                </p>
                                                <p className="font-link-body text-justify">
                                                    NPS blend fertilizer is a mix of single fertilizers which are mixed during the production process into an instant fertilizer recipe, packaged in a big bag. The composition of the mix is homogeneous throughout the entire big bag. This prevents the nutrients from coagulating and turning into hard layers, enabling easy application of the product into the crop field. Different types of blended fertilizers are available in Ethiopia. The NPS blend fertilizer used for crop production in Ethiopia contain nitrogen (19%), phosphorus (38%) and sulphur (7%).
                                                </p>
                                            </div>
                                            <BarChartFert
                                                name={"Fertilizer rate"}
                                                data={[barChartData[1], barChartData[3]]} 
                                                tooltip={<p>Urea: compound fertilizer and source of nitrogen <br/>
                                                NPS: blended fertilizer and source of nitrogen, phosphorus, and sulphur</p>
                                                }
                                            />
                                            <Location id="nps_urea_report" />
                                            <BarChartFert
                                                name={"Fertilizer rate (ISFM)"}
                                                data={[barChartData[0], barChartData[4]]}
                                                tooltip={<p>ISFM: integrated soil fertility management<br/><br/></p>}
                                            />
                                            <Location id="compost_report" />
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
                                {reportInput.ad_fertilizer && <div  className="alert alert-light my-3 border" role="alert">
                                    <h5>Notes: </h5>
                                    <ol>
                                        <li>This advisory is for agricultural land allotted to wheat in 2022 main crop season only.</li>
                                        <li>If there is no sufficient inorganic fertilizer supply, use half inorganic with half organic rates.</li>
                                    </ol>
                                </div>}
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
