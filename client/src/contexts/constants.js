export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'urlProduction'

export const LOCAL_STORED_TOKEN_NAME = 'learnit'

export const POST_LOADED_SUCCESS = "POST_LOADED_SUCCESS"
export const POST_LOADED_FAIL= "POST_LOADED_FAIL"
export const ADD_POST = "ADD_POST"
export const DELETE_POST = "DELETE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const FIND_POST = "FIND_POST"
