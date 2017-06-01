const Chart = require('chart.js')
const elparser = require('elparser')
const regression = require('./regression')
const expression = require('./expression')
const plot = require('./plot')

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

  plot,

  parse_lisp: function(exp) {
    return elparser.parse1(exp).toJS()
  },

  dump_lisp: expression.dump_lisp,

  fit: function(exp, prices) {
    const unbound = expression.unboundVariables(exp).filter(v => v !== 'x')

    const values = regression.optimize(unboundValues => {
      let dict = zipToObject(unbound, unboundValues)
      return utility(x => {
        dict.x = x
        return expression.apply(exp, dict)
      }, prices)
    }, unbound.length)

    return expression.replace(exp, zipToObject(unbound, values))
  },

  toFunction: function(exp) {
    return x => expression.apply(exp, {
      x
    })
  }
}

function zipToObject(keys, values) {
  let a = {}
  keys.forEach((k, i) => {
    a[k] = values[i]
  })
  return a
}


function utility(f, prices) {
  return prices
    .map(p => p.y - f(p.x)) // distance
    .map(a => a * a) // square
    .reduce((a, b) => a + b) // sum
}
