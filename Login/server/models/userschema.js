const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'user name is Required'],
        minLength: [5, 'Name must be 5 char'],
        maxLength: [15, 'Name must be less than 15 char'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'user name is Required'],
        minLength: [5, 'Name must be 5 char'],
        maxLength: [15, 'Name must be less than 15 char'],
        trim: true,
        unique: [true, 'Username is not available']
    },
    email: {
        type: String,
        required: [true, 'user name is Required'],
        trim: true,
        lowercase: true,
        unique: [true, 'User already registerd']
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    bio: {
        type: String,
        required: [true, 'Bio is Required'],
    },
    forgetPasswordToken: {
        type: String,
    },
    forPasswordExpiryDate: {
        type: Date
    }
}, { timestamps: true })

// incrypting password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash
    (this.password,10);
    return next()
})

// Creating jwttoken
userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {
                id:this._id,
                username:this.username
            },
            process.env.SECRET,
            {expiresIn:'24h'}
        )
    }
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;