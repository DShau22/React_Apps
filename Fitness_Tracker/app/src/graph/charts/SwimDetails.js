import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';

class SwimDetails extends Component {
  render() {
    return (
      <Bar
        data={{
          labels: this.props.labels,
          datasets: [{
              label: 'quantity',
              data: this.props.data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
        }}
        options={{
          maintainAspectRatio: true,
          title: {
            text: "Title",
            display: true,
            fontSize: 16
          },
          legend: {
            display: true,
            position: 'right'
          },
          responsive: true
        }}
      />
    )
  }
}

export default SwimDetails
