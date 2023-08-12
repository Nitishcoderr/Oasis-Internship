const express = require('express')
const { signup, signin, getUser, logout } = require('../controllers/authcontroller.js')
const jwtAuth = require('../middleware/jwtAuth.js')


const authRouter = express.Router()

// SignUp route
authRouter.post('/signup',signup)

// Signin routes
authRouter.post('/signin',signin)

// Get user
authRouter.get('/user',jwtAuth,getUser)

// logout user
authRouter.get('/logout',jwtAuth,logout)


module.exports = authRouter