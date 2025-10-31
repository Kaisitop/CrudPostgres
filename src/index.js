import app from "./app.js"
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`😁 Servidor corriendo en el puerto: http://localhost:${port}`)
})
