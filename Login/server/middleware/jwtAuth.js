const JWT = require('jsonwebtoken')

// verifying / Authenticating user

const jwtAuth = (req,res,next)=>{
    const token = (req.cookies && req.cookies.token) || null
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Not Authorized"
        })
    }
    try {
        const payload = JWT.verify(token,process.env.SECRET)
        req.user = {username:payload.username}
        next()
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = jwtAuth;