const express = require('express')
const argon2 = require('argon2')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async(req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing user name and/or password incorrect'})
    } 

    try {
        const user = await User.findOne({username})

        if(user) 
        return res.status(400).json({success: false, message: 'User name already taken'})
        
        // OK
        const hashedPassword = await argon2.hash(password)

        const newUser = new User({username, password: hashedPassword})
        await newUser.save()

        // Return Token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        
        res.json({success: true, message: 'User create successfully', accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal Server error'})
    }
}
)

// @route POST api/auth/login
// @desc login user
// @access Public

router.post('/login', async(req, res) => {
    const { username, password } = req.body
    
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing user name and/or password incorrect'})
    } 

    try {
        // Check for existing user

        const user = await User.findOne({username})
        if(!user)
            return res
                .status(400)
                .json({success: false, message: 'Incorrect username'})
        

        // Username found, check pwd
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) 
            return res
                .status(400)
                .json({success: false, message: 'Incorrect password'})
        
        // Return Token
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        
        res.json({success: true, message: 'Login succesfully', accessToken})
   
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal Server error'})
    
    }
})

router.get('/', (req, res) => res.send('USER ROUTE'))

module.exports = router