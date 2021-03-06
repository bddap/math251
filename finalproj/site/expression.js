function dump_lisp(js) {
  if (typeof js === 'string' || typeof js === 'number') {
    return js
  } else if (js === null) {
    return '()'
  } else {
    return '(' + js.map(dump_lisp).join(' ') + ')'
  }
}

const binary_operators = {
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '**': (a, b) => Math.pow(a, b)
}

const unary_operators = {
  'sin': Math.sin,
  'cos': Math.cos,
}

function apply(exp, dict) {
  if (typeof exp === 'string') {
    return dict[exp]
  }
  if (exp.length === 3) {
    return binary_operators[exp[1]](apply(exp[0], dict), apply(exp[2], dict))
  }
  if (exp.length === 2) {
    return unary_operators[exp[0]](apply(exp[1], dict))
  }
  if (typeof exp === 'number') {
    return exp
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

function unique(ls) {
  return ls.filter(function(item, i, ar) {
    return ar.indexOf(item) === i;
  });
}

function unboundVariables(exp) {
  if (typeof exp === 'number') {
    return []
  }
  if (typeof exp === 'string') {
    return [exp]
  }
  if (exp.length === 3) {
    return unique(unboundVariables(exp[0]).concat(unboundVariables(exp[2])))
  }
  if (exp.length === 2) {
    return unboundVariables(exp[1])
  }
  throw "Cannot apply " + dump_lisp(exp) + ' using ' + JSON.stringify(dict)
}

function mapNumbers(exp, f) {
  if (typeof exp === 'number') {
    return f(exp)
  } else if (typeof exp === 'string') {
    return exp
  } else {
    return exp.map(e => mapNumbers(e, f))
  }
}

function round(number, precision) {
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

function prettyPrint(expr) {
  return dump_lisp(
    mapNumbers(expr, n => round(n, 4))
  )
}

module.exports = {
  dump_lisp,
  apply,
  replace,
  unboundVariables,
  mapNumbers,
  prettyPrint
}
