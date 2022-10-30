require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MONGO_CONNECTION_URL } = process.env
const connectMongoDB = require('./db/mongoConnection')
const todoRouter = require('./routes/todoRoutes')
const app = express()
const port = 5001

app.use(cors({origin: true}))

app.use(express.json())

app.use('/todos', todoRouter)
app.use('/', express.static('public'))

app.listen(port, async () => {
    await connectMongoDB(MONGO_CONNECTION_URL)
    console.log(`Example app listening on port ${port}`)
})
