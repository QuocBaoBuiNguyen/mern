import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
	// Contexts
	const {
        postState: {post},
		showUpdatePostModal,
        setShowUpdatePostModal,
		updatePost,
		setShowToast
	} = useContext(PostContext)

	// State
	const [updatedPost, setUpdatedPost] = useState(post)

	const {title, description, url, status} = updatedPost

    useEffect(() => {
        setUpdatedPost(post)
    }, [post])

	const onChangeUpdatePostForm = event =>{
        console.log({ ...updatedPost, [event.target.name]: event.target.value })
        setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })
    }
        
	const closeDialog = () => {
        setShowUpdatePostModal(false)
    }

	const onSubmit = async event => {
		event.preventDefault()
        console.log(updatedPost)
		const {success, message} = await updatePost(updatedPost)
        setShowUpdatePostModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	// const resetAddPostData = () => {
	// 	setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' })
	// 	setShowAddPostModal(false)
	// }

	return (
		<Modal show={showUpdatePostModal} onHide={closeDialog} >
			<Modal.Header closeButton>
				<Modal.Title>Making progress?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Title'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeUpdatePostForm}
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChangeUpdatePostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
							value={url}
							onChange={onChangeUpdatePostForm}
						/>
					</Form.Group>
                    <Form.Group as  = 'select' value = {status} name = 'status' onChange = {onChangeUpdatePostForm}>
                        <option value = 'TO LEARN'>TO LEARN</option>
                        <option value = 'LEARNING'>LEARNING</option>
                        <option value = 'LEARNED'>LEARNED</option>

                    </Form.Group>
    			</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary'>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						LearnIt!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default UpdatePostModal
