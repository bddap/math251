// function regress(exp, tunables, dataset) {
//   f(exp, x)
// }
// 
// function optimize(f) {
//   return optimize1(f, 1, f(1), 10)
// }
// 
// // run f 
// function optimize1(f, currentx, currenty, step_exponent) {
//   if (step_exponent < (-10)) {
//     return currentx
//   }
//   const xUp = currentx + 2 ** step_exponent
//   const xDown = currentx - 2 ** step_exponent
//   const yUp = f(xUp)
//   const yDown = f(xDown)
//   const xy = min([
//     [currentx, currenty],
//     [xUp, yUp],
//     [xDown, yDown]
//   ], a => a[1])
//   return optimize1(f, xy[0], xy[1], step_exponent - 1)
// }

function optimize(f, numTunables) {
  const tunables = Array(numTunables).map(a => 0) // [0 for _ in range(numTunables)]

  for (let c = 0; c < 1000; c++) {
    for (let i = 0; i < tunables.length; i++) {
      const s = tunables[i]
      tunables[i] = min([+0.0001, 0, -0.0001], a => {
        tunables[i] = s + a
        return f(tunables)
      })
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