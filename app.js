const cookieParser = require('cookie-parser')
const router = require('./routes/router.js')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const dotenv = require('dotenv')

const app = express()
const port = 3000

dotenv.config();

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(express.json())
app.use(router)

// ============= TESTING =============
app.get('/', (req, res) => {
  res.send('Book-App REST API!')
})

// ============= START API =============
app.listen(port, () => {
  console.log(`SIBUKU API listening on port ${port}`)
})