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
  expression,

  fit: function(exp, netw, prices) {
    const unbound = expression.unboundVariables(exp).filter(v => v !== 'x')
    const net = (netw === undefined) ? toObject(unbound) : netw

    const values = regression.optimize(dict => {
      return utility(x => {
        dict.x = x
        return expression.apply(exp, dict)
      }, prices)
    }, net)

    delete values.x
    return values

    // const newExpr = expression.replace(exp, values)
    // return expression.mapNumbers(newExpr, n => round(n, 2))
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
  let sum = 0;
  for (var i = 0; i < prices.length; i++) {
    const d = prices[i].y - f(prices[i].x)
    sum += d * d
  }
  return sum / prices.length;
}
