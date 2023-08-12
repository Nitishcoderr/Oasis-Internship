const express = require('express')
const dataBaseConnect = require('./config/databaseConfig.js')
const authRouter = require('./routes/authRoutes.js')
const cookieParser = require('cookie-parser')

const app = express()

const cors = require('cors')

dataBaseConnect()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.CLIENT_URL],
    credentials:true
}))

app.use('/api/auth',authRouter)

app.use('/',(req,res)=>{
    res.status(200).json({
        data:'Server running'
    })
})

module.exports = app