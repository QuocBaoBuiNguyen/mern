import { useContext } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm"
import RegisterForm from "../components/auth/RegisterForm"
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from "../contexts/AuthContext";

const Auth = ({authRoute}) => {

    const {authState: {authLoading, isAuthenticated}}= useContext(AuthContext)
    
    let body;

    console.log(authLoading, isAuthenticated);

    if(authLoading) {
        body = (
            <div className = '.d-flex justify-content-cnter mt-2'>
                <Spinner animation = 'borer' variant = 'info'/>
            </div>  
        )    
    } else if (isAuthenticated) {
        return <Redirect to='/dashboard'/>
    } else {    
        body = (
        <>
            {authRoute === 'login' && <LoginForm/>}
            {authRoute === 'register' && <RegisterForm/>}
        </>
    )}
    return(
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>LearnIt</h1>
                    <h4>Keep track of what you are LearnIt</h4>                
                    {body}
                </div>
            </div>
        </div>
    )

}

export default Auth