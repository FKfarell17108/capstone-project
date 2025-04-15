const express = require('express')
const cors = require('cors')
const db = require('./config/connection')
require('dotenv').config()

const educontentRoutes = require('./routes/eduRoutes')
const challengesRoutes = require('./routes/challengesRoutes')
const trashRoutes = require('./routes/trashRoutes')
const userRoutes = require('./routes/userRoutes')
const userChallengesRoutes = require('./routes/userChallengesRoutes')
const ordersRoutes = require('./routes/ordersRoutes')
const notificationRoutes = require('./routes/notificationRoutes')

//Model Machine Learning
const mlPredictRoute = require('./routes/mlPredictRoutes')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())
app.use('/api', educontentRoutes)
app.use('/api', challengesRoutes)
app.use('/api', trashRoutes)
app.use('/api', userRoutes)
app.use('/api', userChallengesRoutes)
app.use('/api', ordersRoutes)
app.use('/api', notificationRoutes)

//Model machine learning 
app.use('/api', mlPredictRoute)

app.get('/', (req, res) => {
  res.send('Welcome to Trash to Cash API!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
