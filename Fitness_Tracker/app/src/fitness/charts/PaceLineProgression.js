import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
// import Hammer from "hammerjs";
// import zoom from 'chartjs-plugin-zoom'

export default class LineProgression extends Component {
  componentWillMount(){
    // Chart.pluginService.register(zoom)
  }

  render() {
    var { labels, data, hoverLabel, yAxisMin, yAxisMax, displayDate } = this.props
    console.log(labels, data)
    /**
     * labels: for the x axis have time
     * data: paces data array
     * hoverLabel: "Pace"
     * activity: "Pace progression"
     * yaxisMin: 0
     * yaxisMax: some ratio of steps / time based on user config
     */
    return (
      <div>
        <Line
          data={{
            labels: labels,
            datasets: [{
              label: hoverLabel,
              data: data,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          }}
          options={{
            maintainAspectRatio: true,
            plugins: {
              zoom: false,
              // zoom: {
              //   zoom: {
              //     enabled: false,
              //   },
              //   pan: {
              //     // Boolean to enable panning
              //     enabled: true,

              //     // Panning directions. Remove the appropriate direction to disable
              //     // Eg. 'y' would only allow panning in the y direction
              //     // A function that is called as the user is panning and returns the
              //     // available directions can also be used:
              //     //   mode: function({ chart }) {
              //     //     return 'xy';
              //     //   },
              //     mode: 'x',

              //     // Function called while the user is panning
              //     onPan: function({chart}) { console.log(`I'm panning!!!`); },
              //     // Function called once panning is completed
              //     onPanComplete: function({chart}) { console.log(`I was panned!!!`); }
              //   }
              // }
            },
            title: {
              text: `pace on ${displayDate()}`,
              display: true,
              fontSize: 16
            },
            legend: {
              display: false,
              position: 'right'
            },
            scales: {
              yAxes: [{
                ticks: {
                  min: yAxisMin,
                  max: yAxisMax
                }
              }]
            },
            responsive: true
          }}
        />
      </div>
    )
  }
}
