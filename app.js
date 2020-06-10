const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const keys = require('./config/keys')
const authRoutes = require('./routes/auth')
const app = express()

mongoose.connect(keys.dbUrl , {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))


app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use('/api/auth', authRoutes)

module.exports = app
