
function optimize(f, net) {
  const ks = Object.keys(net)

  for (let c = 0; c < 1000; c++) {
    for (k of ks) {
      const s = net[k]
      const m = min([0.01, 0, -0.01], a => {
        net[k] = s + a
        return f(net)
      })
      net[k] = s + m
    }
  }

  return net
}


function min(ls, f) {
  return ls.reduce((la, lb) => (f(la) < f(lb) ? la : lb))
}

module.exports = {
  optimize
}
