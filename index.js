"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000

//LOG 
// npm i morgan
// morgan is a middleware
const morgan=require('morgan')
// console.log(morgan);
// app.use(morgan('combined'))
// custom morgan
// app.use(morgan('IP:remote-addr TIME:[:date[clf]] REQ:":method :url HTTP/:http-version" RES::status :res[content-length] APP:":user-agent"'))


const fs = require('node:fs')// file system

const now = new Date()
const today = now.toISOString().split('T')[0]
console.log(today);
app.use(morgan('combined', {
    stream: fs.createWriteStream(`./logs/${today}.log`, { flags: 'a+' })
}))

// Documentation Middlewares:
// npm i swagger-ui-express
const swaggerUi = require('swagger-ui-express')
//swagger json
const swaggerJson = require('./swagger.json') 
app.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }))
//  npm i redoc-expres
const redoc = require('redoc-express')
app.use('/docs/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' })
})
app.use('/docs/redoc', redoc({
    specUrl: '/docs/json',
    title: 'API Docs',
}))

// asyncErrors to errorHandler:
require('express-async-errors')


/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

// SessionsCookies:
app.use(require('cookie-session')({ secret: process.env.SECRET_KEY }))

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))
/*
// Login/Logout Control Middleware
app.use(async (req, res, next) => {

    const Personnel = require('./src/models/personnel.model')

    req.isLogin = false

    if (req.session?.id) {

        const user = await Personnel.findOne({ _id: req.session.id })

        // if (user && user.password == req.session.password) {
        //     req.isLogin = true
        // }
        req.isLogin = user && user.password == req.session.password
    }
    console.log('isLogin: ', req.isLogin)

    next()
})
*/
/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PERSONNEL API',
        session: req.session,
        isLogin: req.isLogin,
        api: {
            documents: {
                swagger: 'http://127.0.0.1:8000/docs/swagger',
                redoc: 'http://127.0.0.1:8000/docs/redoc',
                json: 'http://127.0.0.1:8000/docs/json',
            },
            contact: 'clarusway.com'
        },
    })
})

//authentication
app.use(require('./src/middlewares/authentication'))
// /departments
app.use('/departments', require('./src/routes/department.router'))
// /personnels
app.use('/personnels', require('./src/routes/personnel.router'))
// /token
app.use('/tokens', require('./src/routes/token.router'))
// auth (login logout)
app.use('/auth', require('./src/routes/auth.router'))

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()