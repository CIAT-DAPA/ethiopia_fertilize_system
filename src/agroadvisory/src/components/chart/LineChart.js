import React from 'react';
import Chart from "react-apexcharts";

function LineChart() {

    let state = {
          
        series: [{
            name: "N",
            data: [10, 41, 35, 51, 49, 62]
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Relation between N, P and yield',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['10', '20', '30', '40', '50', '60'],
          }
        },
      
      
      };
    
    return (

        
        <div id="chart">
            <Chart options={state.options} series={state.series} type="line" height={300} width="350"/>
        </div>
        

    )


}
export default LineChart;