import {createContext, useReducer, useEffect, useState} from "react"
import axios from 'axios'
import { postReducer } from "../reducers/postReducers";
import { apiUrl, POST_LOADED_FAIL, POST_LOADED_SUCCESS, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({children}) => {
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)

    const [showToast,setShowToast] = useState({
        show: false,
        message: " ",
        type: null  
    })
    
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if(response.data.success) {
                dispatch({type: ADD_POST, payload: response.data.post})
                return response.data
            }
        } catch(error) {
            return error.response.data ? error.response.data : {success: false, message: "Internal server error"}
        }
    }

    const getPosts = async () => {
        try {
            const res = await axios.get(`${apiUrl}/posts`)
            console.log(res.data)
            if(res.data.success) {
                dispatch({
                    type: POST_LOADED_SUCCESS,
                    payload: res.data.posts
                })
            }
        } catch(error) {
            dispatch({
                type: POST_LOADED_FAIL,
            })
            if(error.response.data) {
                return error.response.data 
            } else {
                return {success: false, message: error.message} 
            }
        }
        
    }

    const deletePost = async (postId) => {
        try {
            const res = await axios.delete(`${apiUrl}/posts/${postId}`)
            if(res.data.success) {
                dispatch({type: DELETE_POST, payload: postId})
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: "Internal server error"}
        }
    }
    // Find post when click update button using redux context 
    const findPost = (postId) => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({type: FIND_POST, payload: post}); 
    } 
 
    const updatePost = async (post) => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${post._id}`, post) 
            console.log(response.data.success)
            if(response.data.success) {
                console.log(post._id)
                console.log(post)
                dispatch({type: UPDATE_POST, payload: post})
                return response
            }
        } catch (error) {
            return error
        } 
    }
   
    const postContextData = {postState, getPosts, addPost, deletePost, updatePost, findPost, showAddPostModal, setShowAddPostModal, showUpdatePostModal, setShowUpdatePostModal, showToast, setShowToast}
    
    return (
        <PostContext.Provider value = {postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider