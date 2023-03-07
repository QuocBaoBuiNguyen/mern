import {createContext, useReducer} from "react"
import axios from 'axios'
import { authReducer } from "../reducers/authReducers";
import {apiUrl, LOCAL_STORED_TOKEN_NAME} from './constants'

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer,{
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //Login
    const loginUser = async userForm => {  
        const response = await axios.post(`${apiUrl}/auth/login`)    
        try {
            if(response.data.success) {
                localStorage.setItem(LOCAL_STORED_TOKEN_NAME, response.data.accessToken)
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data 
            } else {
                return {success: false, message: error.message} 
            }
        }
    }

    // Context data
    const authContextData = {loginUser}

    // Return provider
    return (
        <AuthContext.Provider value = {authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider