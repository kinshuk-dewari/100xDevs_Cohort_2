const express = require('express')
const app = express()
const port = 3000

// fs.readFile("path","utf-7",())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/asd', (req, res) => {
  res.send('this is asd')
})

app.listen(port)
console.log("Port is running on : localhost:",{port});