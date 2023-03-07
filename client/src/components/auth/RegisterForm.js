import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'

const RegisterForm = () => {
    return  (
    <>
    <Form>
        <Form.Group className = 'my-4'>
            <Form.Control type = 'text' placeholder='Username' name = 'username' required/>
        </Form.Group>
        <Form.Group>
            <Form.Control type = 'password' placeholder='Password' name = 'password' required/>
        </Form.Group>
        <Form.Group>
            <Form.Control type = 'password' placeholder='Confirm password' name = 'confirmPassword' required/>
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