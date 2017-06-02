function optimize(f, net) {
  const ks = Object.keys(net)

  const step = f(net) / 100000

  for (let c = 0; c < 100; c++) {
    for (k of ks) {
      const s = net[k]
      const m = min([0, 1 * step, -1 * step], a => {
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
