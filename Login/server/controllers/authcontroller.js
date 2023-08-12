const userModel = require('../models/userschema.js')
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')



const signup = async (req, res, next) => {
    const { name, username, email, password, bio } = req.body

    // Validating
    if (!name || !email || !password || !username || !bio) {
        return res.status(400).json({
            success: false,
            message: 'Every field is required'
        })
    }

    // email Validate

    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: 'Please provide valid email Id'
        })
    }

    // Storing  the data in database
    try {
        const userInfo = userModel(req.body);
        const result = await userInfo.save()

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Account already exists with provided email id or username"
            })
        }
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// SignIn routes
const signin = async (req, res) => {
    const { username, password } = req.body;
    // validating username,password
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Every field is required'
        })
    }

    // Identifying that the user is in database or not
    try {
        const user = await userModel.findOne({
            username
        }).select('+password')
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid username or password'
            })
        }
        // Generating token

        const token = user.jwtToken();

        // Generating cookie
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }
        res.cookie("token", token, cookieOption)
        user.password = undefined;
        res.status(200).json({
            success: true,
            data: user
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// User controller
const getUser = async (req, res, next) => {
    const username = req.user.username;

    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Logout
const logout =(req,res)=>{
    try {
        const cookieOption = {
            expires:new Date(),
            httpOnly:true
        }
        res.cookie('token',null,cookieOption)
        res.status(200).json({
            success:true,
            message:"Logged Out"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
module.exports = { signup, signin, getUser,logout}