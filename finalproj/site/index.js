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
    const net = toObject(unbound)

    const values = regression.optimize(dict => {
      return utility(x => {
        dict.x = x
        return expression.apply(exp, dict)
      }, prices)
    }, net)

    delete values.x
    const newExpr = expression.replace(exp, values)
    return expression.mapNumbers(newExpr, n => round(n, 2))
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

function toObject(keys) {
  let a = {}
  keys.forEach(k => {
    a[k] = 0
  })
  return a
}


function utility(f, prices) {
  return prices
    .map(p => p.y - f(p.x)) // distance
    .map(a => a * a) // square
    .reduce((a, b) => a + b) // sum
}

function round(number, precision) {
    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};
