
function optimize(f, numTunables) {
  // [0 for _ in range(numTunables)]
  let tunables = Array.from(Array(numTunables).keys()).map(_ => 0)

  for (let c = 0; c < 10000; c++) {
    for (let i = 0; i < tunables.length; i++) {
      const s = tunables[i]
      const m = min([0.001, 0, -0.001], a => {
        tunables[i] = s + a
        return f(tunables)
      })
      tunables[i] = s + m
    }
  }

  return tunables
}


function min(ls, f) {
  return ls.reduce((la, lb) => (f(la) < f(lb) ? la : lb))
}

module.exports = {
  optimize
}
