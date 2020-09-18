const WH = 3000
const o = 0.7
const gradientProbability = 0.5
let colors = ['#02ADCC', '#fff', '#fb0'] //['#ff0000', '#0000ff']
const gradientCount = 6
const strokeWidth = WH * (3 / 700)

let svgHolder
let svgString = ''
let gradients = []
const r = () => parseFloat(Math.random().toFixed(4))

const svgStart = () =>
  `<svg width="${WH}" height="${WH}" viewBox="0 0 ${WH} ${WH}" xmlns="http://www.w3.org/2000/svg" >
	<defs>${gradients.join('')}`
const svgMask = (elements, num = 0) =>
  `<mask id="mask${num}"><rect x="0" y="0" width="${WH}" height="${WH}" fill="white"/>${elements
    .replace(/opacity=".*"/gi, 'opacity="1" fill="black"')
    .replace(/mask=".*"/gi, '')}</mask>`
const svgMid = () =>
  `</defs><rect x="0" y="0" width="${WH}" height="${WH}" fill="${
    colors[Math.floor(r() * colors.length)]
  }" ></rect>`
const svgEnd = `</svg>`

const elementAddins = () => `opacity="${o}" mask="url(#mask0)"`
const fillElementAddins = () => {
  return `fill="url(#grad${Math.floor(
    r() * gradientCount
  )})" stroke="none" fill-rule="nonzero"`
}
const strokeElementAddins = () => {
  return `stroke="url(#grad${Math.floor(
    r() * gradientCount
  )})" stroke-width="${strokeWidth}" fill="none"`
}

function reset() {
  colors = shuffle(colors)
  resetGradients()
  svgString = svgStart()
}

function resetGradients() {
  gradients = []
  for (let i = 0; i < gradientCount; i++) {
    const color1 = colors[Math.floor(r() * colors.length)]
    const color2 = colors[Math.floor(r() * colors.length)]
    gradients.push(`<linearGradient id="grad${i}" x1="0%" y1="0%" x2="${
      Math.round(r()) * 100
    }%" y2="${Math.round(r()) * 100}%">
	<stop offset="0%" stop-color="${color1}" stop-opacity="${
      r() > 0.5 ? '0' : o
    }" />
	<stop offset="100%" stop-color="${color2}" stop-opacity="${
      r() > 0.5 ? '0' : o
    }" />
</linearGradient>`)
  }
}

function go(elements = 100, mask = false) {
  reset()

  if (mask) {
    let maskString = ''
    for (let i = 0; i < r() * 20; i++)
      maskString += randomElement().replace(
        `opacity="${o}"`,
        'opacity="1"'
      )
    let fullMaskString = svgMask(maskString)
    if (r() > 0.5) svgString += fullMaskString
  }

  svgString += svgMid()

  for (let i = 0; i < r() * (elements - 2) + 2; i++)
    svgString += randomElement()

  svgString += svgEnd
  svgHolder.innerHTML = svgString
}

function colorSelect() {
  return colors[Math.floor(r() * colors.length)]
}

function randomElement() {
  const possibilities = [
    randomCircle,
    randomRectangle,
    randomLine,
    // randomPath,
    // randomTinyPath,
    // randomTinyShape,
    randomRoundShape,
    randomAngularShape,
  ]
  return possibilities[Math.floor(r() * possibilities.length)]()
}

function randomCircle() {
  const x = r() * WH,
    y = r() * WH,
    rad = (r() * WH) / 2
  return `<circle cx="${x}" cy="${y}" r="${rad}" ${elementAddins()} ${fillElementAddins()}></circle>`
}

function randomRectangle() {
  const x = r() * WH * 1.5 - WH * 0.25,
    y = r() * WH * 1.5 - WH * 0.25,
    w = r() * WH * 1.25,
    h = r() * WH * 1.25
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${elementAddins()} ${fillElementAddins()}></rect>`
}

function randomLine() {
  const x1 = r() * WH * 1.5 - WH * 0.25,
    y1 = r() * WH * 1.5 - WH * 0.25,
    x2 = r() * WH * 1.5 - WH * 0.25,
    y2 = r() * WH * 1.5 - WH * 0.25
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${elementAddins()} ${strokeElementAddins()} />`
}

function randomPath() {
  const pairs = []
  pairs.push([r() * WH * 1.3 - WH * 0.15, r() * WH * 1.3 - WH * 0.15])
  for (let i = 1; i < r() * 5 + 2; i++)
    pairs.push([
      r() * WH * 0.3 * (r() > 0.5 ? -1 : 1),
      r() * WH * 0.3 * (r() > 0.5 ? -1 : 1),
    ])
  let pathStr = `<path d="M ${pairs[0][0]} ${pairs[0][1]} `
  for (let i = 1; i < pairs.length; i++)
    pathStr += `t ${pairs[i][0]} ${pairs[i][1]} `
  pathStr += `" ${elementAddins()} ${strokeElementAddins()} />`
  return pathStr
}

function randomTinyPath() {
  const pairs = []
  pairs.push([r() * WH * 1.3 - WH * 0.15, r() * WH * 1.3 - WH * 0.15])
  for (let i = 1; i < r() * 10 + 3; i++)
    pairs.push([
      r() * WH * 0.05 * (r() > 0.5 ? -1 : 1),
      r() * WH * 0.05 * (r() > 0.5 ? -1 : 1),
    ])
  let pathStr = `<path d="M ${pairs[0][0]} ${pairs[0][1]} `
  for (let i = 1; i < pairs.length; i++)
    pathStr += `l ${pairs[i][0]} ${pairs[i][1]} `
  pathStr += `Z" ${elementAddins()} ${strokeElementAddins()} />`
  return pathStr
}

function randomTinyShape() {
  const pairs = []
  pairs.push([r() * WH * 1.3 - WH * 0.15, r() * WH * 1.3 - WH * 0.15])
  for (let i = 1; i < r() * 10 + 3; i++)
    pairs.push([
      r() * WH * 0.05 * (r() > 0.5 ? -1 : 1),
      r() * WH * 0.05 * (r() > 0.5 ? -1 : 1),
    ])
  let pathStr = `<path d="M ${pairs[0][0]} ${pairs[0][1]} `
  for (let i = 1; i < pairs.length; i++)
    pathStr += `l ${pairs[i][0]} ${pairs[i][1]} `
  pathStr += `" ${elementAddins()} ${fillElementAddins()} />`
  return pathStr
}

function randomRoundShape() {
  const pairs = []
  pairs.push([r() * WH * 1.3 - WH * 0.15, r() * WH * 1.3 - WH * 0.15])
  for (let i = 1; i < r() * 5 + 2; i++)
    pairs.push([
      r() * WH * 0.3 * (r() > 0.5 ? -1 : 1),
      r() * WH * 0.3 * (r() > 0.5 ? -1 : 1),
    ])
  let pathStr = `<path d="M ${pairs[0][0]} ${pairs[0][1]} `
  for (let i = 1; i < pairs.length; i++)
    pathStr += `t ${pairs[i][0]} ${pairs[i][1]} `
  pathStr += `" ${elementAddins()} ${fillElementAddins()} />`
  return pathStr
}

function randomAngularShape() {
  const pairs = []
  pairs.push([r() * WH * 1.3 - WH * 0.15, r() * WH * 1.3 - WH * 0.15])
  for (let i = 1; i < r() * 5 + 2; i++)
    pairs.push([
      r() * WH * 0.3 * (r() > 0.5 ? -1 : 1),
      r() * WH * 0.3 * (r() > 0.5 ? -1 : 1),
    ])
  let pathStr = `<path d="M ${pairs[0][0]} ${pairs[0][1]} `
  for (let i = 1; i < pairs.length; i++)
    pathStr += `l ${pairs[i][0]} ${pairs[i][1]} `
  pathStr += `" ${elementAddins()} ${fillElementAddins()} />`
  return pathStr
}

function download() {
  html2canvas(svgHolder).then((canvas) => {
    document.body.appendChild(canvas)
  })
  // const filename = `${Date.now()}`.substring(6),
  //   svg0 = svgHolder.innerHTML,
  //   element = document.createElement('a')
  // element.setAttribute(
  //   'href',
  //   'data:text/plain;charset=utf-8,' + encodeURIComponent(svg0)
  // )
  // element.setAttribute('download', `${filename}.svg`)
  // element.style.display = 'none'
  // document.body.appendChild(element)
  // element.click()
  // document.body.removeChild(element)
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

;(function () {
  svgHolder = document.getElementById('svgholder0')
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') go()
  })
  document.getElementById('go').addEventListener('click', go)
  document.getElementById('dl').addEventListener('click', download)
  document.getElementById('master').style.width = `${WH}px`
  document.getElementById('master').style.height = `${WH}px`
  go()
})()
