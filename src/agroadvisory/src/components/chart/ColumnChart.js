import React from 'react';
import Chart from "react-apexcharts";

function ColumnChart({data, type}) {

  const [dataFormatted, setDataFormatted] = React.useState();
  const typeToTypeName = new Map();
    typeToTypeName.set('637e459f6b22dee825f5b84e','compost');
    typeToTypeName.set('637e45e66b22dee825f5b84f','nps');
    typeToTypeName.set('637e462c6b22dee825f5b850','optimal yield');
    typeToTypeName.set('637e466f6b22dee825f5b851','urea');
    typeToTypeName.set('637e46b46b22dee825f5b852','vermi compost')

  React.useEffect(() => {
    
      let aux = {metric_name: [], above:[], normal:[], below:[]}
  
      data.map(value => (
        aux.metric_name.push(typeToTypeName.get(value.type)),
        aux.above.push(value.values[0].values[0].toFixed(2)),
        aux.normal.push(value.values[1][0].values[0].toFixed(2)),
        aux.below.push(value.values[2][0].values[0].toFixed(2))
        
      ));
      setDataFormatted(aux);

    
    
    
    
}, [data]);

let state;
if(dataFormatted){
  
  if(type === 'fertilizer_rate'){
    state = {
        series: [{
            name: 'Above normal',
            data: dataFormatted.above
          }, {
            name: 'Inside normal',
            data: dataFormatted.normal
          }, {
            name: 'Below normal',
            data: dataFormatted.below
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 10,
                dataLabels: {
                  total: {
                    enabled: true,
                    style: {
                      fontSize: '13px',
                      fontWeight: 900
                    }
                  }
                }
              },
            },
            xaxis: {
              type: 'string',
              categories: dataFormatted.metric_name,
            },
            legend: {
              position: 'right',
              offsetY: 40
            },
            fill: {
              opacity: 1
            }
          },
        
        
        
        };

  }
  else{
    state = {
          
      series: [{
        data: [dataFormatted.above[0], dataFormatted.normal[0], dataFormatted.below[0]]
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: ['#0d6efd', '#20c997', '#ffc107'],
        plotOptions: {
          bar: {
            columnWidth: '45%',
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
          categories: [
            'Above normal', 'Inside normal', 'Below normal'
          ],
          labels: {
            style: {
              colors: null,
              fontSize: '12px'
            }
          }
        }
      },
    
    
    };

  }

}
    return  (
      <div>
        {
          dataFormatted &&
            <Chart options={state.options} series={state.series} type="bar" height={350} width="400" />
        }

      </div>
        
        

    )
}
export default ColumnChart;