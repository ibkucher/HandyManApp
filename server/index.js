const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// const database = require('./database')

// API
// API for users
var usersRouter = require('./routes/users')
// API for user_types
var userTypesRouter = require('./routes/userTypes')
// API for customer
var customersRouter = require('./routes/customers')
// API for address
var addressessRouter = require('./routes/addresses')
// API for skills
var skillsRouter = require('./routes/skills')
// API for handymen
var handymenRouter = require('./routes/handymen')
// API for handyman abilities
var handymanAbilitiesRouter = require('./routes/handymanAbilities')
// API for requests (booking)
const requestsRouter = require('./routes/requests')
// API for request details (booking)
const requestDetailsRouter = require('./routes/requestDetails')
// API for services
const servicesRouter = require('./routes/services')
// API for statuses
const statusesRouter = require('./routes/statuses')
// API for workdays
const workdaysRouter = require('./routes/workdays')

const app = express()

console.log(process.env.PORT)
const port = process.env.PORT || 4011
app.listen(port, () => {
    console.log(`listening on ${port}`)
})
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())

// request api return from database
// request api for user
app.use('/api/v1/json/users', usersRouter)
// request api for user_type
app.use('/api/v1/json/userTypes', userTypesRouter)
// request api for customer
app.use('/api/v1/json/customers', customersRouter)
// request api for addresser
app.use('/api/v1/json/addresses', addressessRouter)
// request api for skill
app.use('/api/v1/json/skills', skillsRouter)
// request api for handyman
app.use('/api/v1/json/handymen', handymenRouter)
// request api for handymanAbilities
app.use('/api/v1/json/handymanAbilities', handymanAbilitiesRouter)
// request api for services
app.use('/api/v1/json/requests', requestsRouter)
// request api for request details (booking)
app.use('/api/v1/json/requestDetails', requestDetailsRouter)
// request api for services
app.use('/api/v1/json/services', servicesRouter)
// request api for statuses
app.use('/api/v1/json/statuses', statusesRouter)
// request api for statuses
app.use('/api/v1/json/workdays', workdaysRouter)

process.on('SIGINT', function () {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)')
    // some other closing procedures go here
    process.exit(1)
})
