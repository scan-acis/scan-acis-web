///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
//import Highcharts from 'highcharts';
//import HighchartsReact from 'highcharts-react-official';

//Styles
//import 'Charts.css'
import '../../../styles/WaterDefTool.css'

//var HighchartsMore = require('highcharts-more');
//HighchartsMore(Highcharts);
//require("highcharts/modules/exporting")(Highcharts);

import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import Exporting from 'highcharts/modules/exporting'
import ExportData from 'highcharts/modules/export-data'
import HighchartsReact from 'highcharts-react-official'

HighchartsMore(Highcharts)
Exporting(Highcharts)
ExportData(Highcharts)

const DisplayWaterDeficitChart = ({data,depthRangeTop,depthRangeBottom,units,stnName}) => {

        const afterRender = (chart) => {
            //let textX = chart.plotLeft + (chart.plotWidth  * 0.5);
            let textY = chart.plotTop  + (chart.plotHeight * 0.5);
            //if (Array.isArray(data)) {
            //    if (data.length===0) {
            //        chart.renderer.text('No data to display', chart.plotLeft+40, textY).css({ color:"#ff0000", fontSize:"16px"}).add()
            //    }
            //}
            if (Object.keys(data).length===0) {
                chart.renderer.text('No data to display', chart.plotLeft+40, textY).css({ color:"#ff0000", fontSize:"16px"}).add()
            }
        };

        const options = {
          title: {
            text: 'Available Water Deficit (Depth: '+depthRangeTop.toString()+' - '+depthRangeBottom.toString()+' '+units+')'
          },
          subtitle: {
            text: 'Station: '+stnName
          },
          exporting: { enabled: false },
          tooltip: { useHtml:true, shared:true, borderColor:"#000000", borderWidth:2, borderRadius:8, shadow:false, backgroundColor:"#ffffff",
              xDateFormat:"%b %d, %Y", shape: 'rect',valueDecimals:2,
              crosshairs: { width:1, color:"#ff0000", snap:true }},
          credits: { text:"Powered by ACIS", href:"http://www.rcc-acis.org/", color:"#000000" },
          legend: false,
          xAxis: { type: 'datetime', gridLineWidth: 1, crosshair: true, startOnTick: true, endOnTick: false, labels: { align: 'center', x: 0, y: 20 },
                     dateTimeLabelFormats:{ day:'%d %b', week:'%d %b', month:'%b<br/>%Y', year:'%Y' },
                 },
          yAxis: {
              title:{ text:"Water Deficit ("+units+")",style:{"font-size":"14px", color:"#000000"}},
              maxRange: data.fc_ref - data.pwp_ref,
              minRange: data.fc_ref - data.pwp_ref,
              max: data.fc_ref - data.pwp_ref,
              min:0,
              plotLines: [{
                  color: 'black',
                  dashStyle: 'dash',
                  value: data.fc_ref - data.fc_ref,
                  width: 2,
                  zIndex: 2,
                  label:{
                      text:'No Plant Stress',
                      style: {
                        color: '#0000FF',
                        fontWeight: 'bold'
                      }
                  }
                },{
                  color: 'black',
                  dashStyle: 'dash',
                  value: (data.fc_ref - data.pwp_ref)/2.,
                  width: 2,
                  zIndex: 2,
                  label:{
                      text:'Plant Stress',
                      style: {
                        color: '#FF0000',
                        fontWeight: 'bold'
                      },
                  }
                },{
                  color: 'black',
                  dashStyle: 'dash',
                  value: data.fc_ref - data.pwp_ref,
                  width: 2,
                  zIndex: 2,
                  label:{
                      text:'Wilting Point',
                      style: {
                        color: 'black',
                        fontWeight: 'bold'
                      },
                  }
                }]
            },
          series: [{
            name:'Water Deficit',
            type: 'line',
            color: 'black',
            zones: [{
              value: (data.fc_ref - data.pwp_ref)/2.,
              color: '#0000FF'
            },{
              color: '#FF0000'
            }],
            data: data.data_series,
            zIndex: 102,
          }]
        }

        return (
          <div id="waterdef-chart">
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"chart"}
              containerProps = {{ className: 'chartContainer' }}
              options={options}
              callback={afterRender}
            />
          </div>
        );

}

DisplayWaterDeficitChart.propTypes = {
  data: PropTypes.object.isRequired,
  depthRangeTop: PropTypes.number.isRequired,
  depthRangeBottom: PropTypes.number.isRequired,
  units: PropTypes.string.isRequired,
  stnName: PropTypes.string.isRequired,
};

export default DisplayWaterDeficitChart;
