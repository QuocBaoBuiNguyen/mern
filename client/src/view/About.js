import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const About = () => {
	return (
		<Row className='mt-5' style={{ marginRight: 0 }}>
			<Col className='text-center'>
				<Button
					variant='primary'
					href='https://www.linkedin.com/in/bao-quoc/'
					size='lg'
				>
					Visit my linkedln profile for more information
				</Button>
			</Col>
		</Row>
	)
}

export default About
