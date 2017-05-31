const Chart = require('chart.js')
const elparser = require('elparser')

function dump_lisp(js) {
  if (typeof js === 'string' || typeof js === 'number') {
    return js
  } else if (js === null) {
    return '()'
  } else {
    return '(' + js.map(dump_lisp).join(' ') + ')'
  }
}

function utility(f, prices) {
  return prices
    .map(p => p.y - f(p.x)) // distance
    .map(a => a * a) // square
    .reduce((a, b) => a + b) // sum
}

function min(ls, f) {
  return ls.reduce((la, lb) => (f(la) < f(lb) ? la : lb))
}

// run f 
function optimize1(f, currentx, currenty, step_exponent) {
  if (step_exponent < (-10)) {
    return currentx
  }
  const xUp = currentx + 2 ** step_exponent
  const xDown = currentx - 2 ** step_exponent
  const yUp = f(xUp)
  const yDown = f(xDown)
  const xy = min([
    [currentx, currenty],
    [xUp, yUp],
    [xDown, yDown]
  ], a => a[1])
  return optimize1(f, xy[0], xy[1], step_exponent - 1)
}

function optimize(f) {
  return optimize1(f, 1, f(1), 10)
}

const binary_operators = {
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '+': (a, b) => a + b,
  '-': (a, b) => a - b
}

const unary_operators = {
  'sin': Math.sin,
  'cos': Math.cos,
}

function apply(exp, dict) {
  if (dict.hasOwnProperty(exp)) {
    return dict[exp]
  }
  if (typeof exp === 'number') {
    return exp
  }
  if (exp.length === 3) {
    return binary_operators[exp[1]](apply(exp[0], dict), apply(exp[2], dict))
  }
  if (exp.length === 2) {
    return unary_operators[exp[0]](apply(exp[1], dict))
  }
  throw "Cannot apply " + dump_lisp(exp) + ' using ' + JSON.stringify(dict)
}

function replace(exp, dict) {
  if (dict.hasOwnProperty(exp)) {
    return dict[exp]
  }
  if (typeof exp === 'number') {
    return exp
  }
  if (exp.length === 3) {
    return [replace(exp[0], dict), exp[1], replace(exp[2], dict)]
  }
  if (exp.length === 2) {
    return [exp[0], replace(exp[1], dict)]
  }
  return exp
}

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

  plot: function(canvasId, prices, regression) {
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
            y: regression(a.y)
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
  },

  parse_lisp: function(exp) {
    return elparser.parse1(exp).toJS()
  },

  dump_lisp,

  fit: function(exp, curve) {
    const a = optimize(a => utility(x => apply(exp, {
      a,
      b: 0,
      c: 0,
      x
    }), curve))
    const b = optimize(b => utility(x => apply(exp, {
      a,
      b,
      c: 0,
      x
    }), curve))
    const c = optimize(c => utility(x => apply(exp, {
      a,
      b,
      c,
      x
    }), curve))

    return replace(exp, {
      a,
      b,
      c
    })
  },

  toFunction: function(exp) {
    return x => apply(exp, {
      x
    })
  }
}