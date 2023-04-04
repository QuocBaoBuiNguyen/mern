import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage  from '../layout/AlertMessage'

const RegisterForm = () => {

    const {registerUser} =  useContext(AuthContext) 

    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password, confirmPassword} = registerForm;
    const onChangeRegisterForm = event => setRegisterForm({...registerForm, [event.target.name]: event.target.value})

    const register = async (event) => {
        event.preventDefault();
        
        try {
            const resgisterData = await registerUser(registerForm)
            if(password !== confirmPassword) {
                    setAlert({type: 'danger', message: "Password do not match"})
                    setTimeout(() => {
                        setAlert(null)
                    }, 5000); 
                return
            }
            // const loginData = await loginUser(loginForm)
            if(resgisterData.success) {
                // console.log(" History push to dashboard", loginData)
                // history.push("/dashboard")
            } else {
                setAlert({type: 'danger', message: resgisterData.message})
                setTimeout(() => {
                    setAlert(null)
                }, 5000); 
            }                
        } catch(error) {
            console.log(error)
        }
    }

    return  (
    <>
    <Form onSubmit={register}>
        <AlertMessage info={alert}/>
        <Form.Group className = 'my-4'>
            <Form.Control type = 'text' placeholder='Username' name = 'username' required value = {username}  onChange= {onChangeRegisterForm}/>
        </Form.Group>
        <Form.Group>
            <Form.Control type = 'password' placeholder='Password' name = 'password' required  value = {password}  onChange= {onChangeRegisterForm}/>
        </Form.Group>
        <Form.Group>
            <Form.Control type = 'password' placeholder='Confirm password' name = 'confirmPassword' required  value = {confirmPassword}  onChange= {onChangeRegisterForm}/>
        </Form.Group>
        <Button variant='success' type='submit' className='my-4'>Register</Button>
    </Form>
    <p> Already have an account?
        <Link to = '/login'>
            <Button variant='info' size = 'sm' className = 'my-2'> Login </Button>
        </Link>
    </p>
    </>)
}
export default RegisterForm