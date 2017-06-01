module.exports = function(canvasId, prices, regression) {
  const datasets = [{
    label: 'Source Data',
    data: prices,
    fill: false
  }]

  if (regression !== undefined) {
    datasets.push({
      label: 'Regression',
      data: prices.map(a => {
        return {
          x: a.x,
          y: regression(a.x)
        }
      }),
      fill: false
    })
  }

  new Chart(canvasId, {
    type: 'line',
    data: {
      datasets: datasets
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'House Pricing Index Oregon'
      },
      scales: {
        xAxes: [{
          type: 'linear',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Year'
          }
        }],
        yAxes: [{
          type: 'linear',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Average Price in Thousands of Dollars'
          }
        }]
      },
      animation : false,
      elements: {
        point: {
          radius: 0
        }
      }
    }
  })
}
