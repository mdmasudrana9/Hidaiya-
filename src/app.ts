import express from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler as any)
app.use(notFound as any)

export default app
