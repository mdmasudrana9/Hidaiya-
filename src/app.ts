import express from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import cookieParser from 'cookie-parser'
const app = express()
app.use(express.json())

app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true })) // chaile akhane star diye kaj chalai neya jai 5173 ar poriborte

app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler as any)
app.use(notFound as any)

export default app
