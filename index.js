const { createServer } = require('https')

const range = (from, to) => Array.from(
  {length: to - from + 1},
  (_, index) => index + from
)

const random = (from, to) => Math.round(
  Math.random() * (to - from)
) + from

const height = 200
const partUrl = 'http://placehold.it/'

const generateCards = () => range(1, random(10, 25)).map(number => {
  const size = `${height}x${random(150, 250)}`
  const url = `${partUrl}${size}?text=${number}`

  return { size, url }
})

const PORT = process.env.PORT || 5000
const server = createServer((_, res) => {
  const content = JSON.stringify(generateCards())

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })

  res.end(content)
})

server.listen(5000, () => {
  console.log(`server work on ${PORT}`)
})
