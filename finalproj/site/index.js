const Chart = require('chart.js')

module.exports = {
  fillTable: function(table, tds) {
    tds.forEach(row => {
      const r = table.insertRow()
      row.forEach(cell => {
        r.insertCell().textContent = cell;
      });
    });
  },

  loadPrices: function() {
    return fetch('prices.json')
      .then(a => a.json())
  },

  ctxIn: function(idname) {
    const parent = document.getElementById(idname)
    const canvas = document.createElement('canvas')
    parent.appendChild(canvas)
    return canvas.getContext("2d")
  }
}

// loadPrices()
//   .then(prices => {
//     // show table
//     // showTable([
//     //   ["Time (years)", "Average Oregon home price (thousands of dollars)"]
//     // ].concat(
//     //   prices.map(p => [p.x, p.y])
//     // ), document.getElementById('data_table'))
// 
//   })

// document.onload = function() {
//   
//   let ctx = document.getElementById("myChart").getContext("2d");
// 
//