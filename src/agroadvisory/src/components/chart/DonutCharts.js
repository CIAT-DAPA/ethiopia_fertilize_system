import React from 'react';
import Chart from "react-apexcharts";

function DonutChart({data}) {

    console.log(data)

    let state = {
          
        series: [0.546114998, 0.183562279, 0.270322762],
        options: {
          plotOptions: {
            pie: {
                donut: {
                    size: '40%'
                  }
                }
              },
          labels: ['Below normal', 'Inside normal', 'Above normal'],  
          chart: {
            type: 'donut',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      
      
      };
    
    return (

        
        <div id="chart">
            <h4 className='text-center'>2023</h4>
            <h4 className='text-center'>January - February - March</h4>
            <h6 className='text-center'>Precipitation probabilities (%)</h6>
            <Chart options={state.options} series={state.series} type="donut" height={300} width="350"/>
        </div>
        

    )


}
export default DonutChart;