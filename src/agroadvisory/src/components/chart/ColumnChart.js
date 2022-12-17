import React from 'react';
import Chart from "react-apexcharts";

function ColumnChart({data, type}) {

  const [dataFormatted, setDataFormatted] = React.useState();
  const typeToTypeName = new Map();
    typeToTypeName.set('63865d9f68c981103580abf0','compost');
    typeToTypeName.set('63865ef468c981103580e666','nps');
    typeToTypeName.set('638660ad68c98110358120dc','optimal yield');
    typeToTypeName.set('638662c668c9811035815b52','urea');
    typeToTypeName.set('6386653e68c98110358195c8','vermi compost')

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
  //console.log(dataFormatted);
  
  if(type === 'fertilizer_rate'){
    state = {
        series: [{
            name: 'Above normal',
            data: dataFormatted.above
          }, {
            name: 'Normal',
            data: dataFormatted.normal
          }, {
            name: 'Below normal',
            data: dataFormatted.below
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: dataFormatted.metric_name,
            },
            yaxis: {
              title: {
                text: dataFormatted.metric_name.includes('nps') || dataFormatted.metric_name.includes('urea') ? 'kg/ha':'ton/ha'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + (dataFormatted.metric_name.includes('nps') || dataFormatted.metric_name.includes('urea') ? ' kg/ha':' ton/ha')
                }
              }
            }
          },
        
        
        
        };

  }
  else{
    state = {
          
      series: [{
        name:'optimal yield',
        data: [dataFormatted.above[0], dataFormatted.normal[0], dataFormatted.below[0]]
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar'
        },
        colors: ['#0d6efd', '#20c997', '#ffc107'],
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
          categories: [
            'Above normal', 'Normal', 'Below normal'
          ],
          labels: {
            style: {
              colors: null,
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'kg/ha'
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " kg/ha"
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
            <Chart options={state.options} series={state.series} type="bar" height={300}  />
        }

      </div>
        
        

    )
}
export default ColumnChart;