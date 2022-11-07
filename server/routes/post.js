const express = require('express')
const router =  express.Router()

const Post = require('../models/Post')
const { route } = require('./auth')

// @route POST api/posts
// @desc Create post
// @access Private 

router.post('/', async(req, res) => {
    const{title, description, url, status} = req.body

    // Simpe validation
    if(!title)
    return res.status(400).json({success: false, message: 'Title is required'})

    try {
        const newPost = new Post({
            title, 
            description, 
            url: url.startsWith('https://') ? url: `https://${url}`,
            status: status || 'TO LEARN',
            user: '6367cd7a8a1ff1023031573d'
        })

        await newPost.save()

        res.json({success: true, message: 'Happy Learning', post: newPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal Server error'})
    }
})

module.exports = router