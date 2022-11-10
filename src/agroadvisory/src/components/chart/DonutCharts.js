import React from 'react';
import Chart from "react-apexcharts";

function DonutChart({data}) {

    function toMonthName(monthNumber) {
      const date = new Date();
      date.setMonth(monthNumber - 1);
    
      return date.toLocaleString('en-US', {
        month: 'long',
      });
    }

    console.log(data.probabilities[0].lower)
    console.log(data.probabilities[0].normal)
    console.log(data.probabilities[0].upper)

    let state = {
          
        series: [data.probabilities[0].lower, data.probabilities[0].normal, data.probabilities[0].upper],
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

        
        <div id="donutChart" className='mb-5 ms-5 me-5'>
            <h4 className='text-center'>{data.year}</h4>
            <h4 className='text-center'>{toMonthName(data.month - 1)} - {toMonthName(data.month)} - {toMonthName(data.month + 1)}</h4>
            <h6 className='text-center'>Precipitation probabilities (%)</h6>
            <Chart options={state.options} series={state.series} type="donut" height={300} width="350" />
        </div>
        

    )


}
export default DonutChart;