const express = require('express')
const router =  express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../models/Post')
const { findOneAndUpdate, findOneAndDelete } = require('../models/User')
const { route } = require('./auth')

// @route GET api/posts
// @desc Create post
// @access Private 

router.get('/', verifyToken, async(req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', [
            'username'
        ])
        res.json({success: true, posts})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal Server error'})
    }
})

// @route POST api/posts
// @desc Create post
// @access Private 

router.post('/', verifyToken, async(req, res) => {
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
            user: req.userId
        })

        await newPost.save()

        res.json({success: true, message: 'Happy Learning', post: newPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal Server error'})
    }
})

// @route PUT api/posts
// @desc Update post
// @access Private 
router.put('/:id', verifyToken, async(req, res)=> {
    const {title, description, url, status} = req.body;
    if(!title)
    return res
            .status(400)
            .json({success: false, message: 'Title is required'})
    try {
        let updatedPost =  {
            title, 
            description: description || '', 
            url: (url.startsWith('https://') ? url: `https://${url}`) || '',
            status: status || 'TO LEARN'
        }
        const postUpdateCondition ={ _id: req.params.id, user: req.userId}
        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true});
        if (!updatedPost) {
            return res
            .status(401)
            .json({success: false, message: 'User not authorize or post not found'})
        } else {
            return res
            .status(200)
            .json({success: true, message: 'Excellent!'})    
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal Server error'})
    }
})

// @route DELETE api/posts
// @desc DELETE post
// @access Private 
router.delete('/:id', verifyToken, async(req, res)=> {
    try {
        const deletePostCondition ={ _id: req.params.id, user: req.userId}
        const isDeletedPost = await Post.findOneAndDelete(deletePostCondition);
        if (!isDeletedPost) {
            return res
            .status(401)
            .json({success: false, message: 'User not authorize or post not deleted'})
        } else {
            return res
            .status(200)
            .json({success: true, message: 'Deleted Excellent!'})    
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal Server error'})
    }
})
module.exports = router