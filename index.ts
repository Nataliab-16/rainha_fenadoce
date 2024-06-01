import express from 'express'
const app = express()
const port = process.env.PORT ?? 3000
import votosRoutes from './routes/votos'
import clientesRoutes from './routes/clientes'
import candidatasRoutes from './routes/candidatas'
app.use(express.json())
app.use("/candidatas", candidatasRoutes)
app.use("/clientes", clientesRoutes)
app.use("/votos", votosRoutes)

app.get('/', (req, res) => {
  res.send('API Fenadoce')})

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`)})
