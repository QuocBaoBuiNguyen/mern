import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const LoginForm = () => {
    // Context

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const {username, password} = loginForm;
    const onChangeLoginForm = event => setLoginForm({...LoginForm, [event.target.name]: event.target.value})

    return  (
    <>
    <Form>
        <Form.Group className = 'my-4'>
            <Form.Control 
                type = 'text' 
                placeholder='Username'
                name = 'username' 
                required
                //value = {username}
                onchange={onChangeLoginForm}
            />
        </Form.Group>
        <Form.Group>
            <Form.Control 
                type = 'password' 
                placeholder='Password' 
                name = 'password' 
                required
                //value = {password}
                wqrwqrwrqonchange={onChangeLoginForm}
            />
        </Form.Group>
        <Button variant='success' type='submit' className='my-4'>Login</Button>
    </Form> 
    <p> Don't you have an account?
        <Link to = '/register'> 
        <Button variant='info' size = 'sm' className = 'ml-2'> Register </Button>
        </Link>
    </p>
    </>
    )
}
export default LoginForm