const express = require('express')
const cors = require('cors')

require('dotenv-safe').config({
    allowEmptyValues: true
})

const routes = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(5000, () => {
    console.log('App listening on port 5000')
})