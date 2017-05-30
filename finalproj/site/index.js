const vis = require('vis')
const Chart = require('chart')

function showTable(table, parent) {
  const t = document.createElement('table');
  parent.appendChild(t);
  table.forEach((row, i) => {
    const r = t.insertRow(i);
    row.forEach((cell, j) => {
      r.insertCell(j).textContent = cell;
    });
  });
}

function loadPrices() {
  return fetch('prices.json')
    .then(a => a.json())
}

function ctxIn(idname) {
  const parent = document.getElementById(idname)
  const canvas = document.createElement('canvas')
  parent.appendChild(canvas)
  return canvas.getContext("2d")
}

loadPrices()
  .then(prices => {
    // show table
    // showTable([
    //   ["Time (years)", "Average Oregon home price (thousands of dollars)"]
    // ].concat(
    //   prices.map(p => [p.x, p.y])
    // ), document.getElementById('data_table'))

    // console.log(prices[0])
    // // show plot
    // const container = document.getElementById('initial_plot');
    // // const dataset = new vis.DataSet(prices);
    // const options = {
    //   start: 1975.0,
    //   end: 2016.75
    // };
    // const graph2d = new vis.Graph2d(container, prices, options);
    // console.log(graph2d)
    const c = ctxIn('visualization')
    c.line
    console.log(prices)

    let myLineChart = new Chart(ctxIn('initial_plot'), {
      type: 'line',
      data: prices
    })

    console.log(myLineChart);
  })
