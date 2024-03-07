import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import itemRoutes from './routes/items.js'
import userRoutes from './routes/user.js'

const app = express()
app.use(bodyParser.json())
dotenv.config()
app.use(cors())

// routes
app.use('/items', itemRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.send('APP IS RUNNING')
})

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.CONNECTION_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message))
