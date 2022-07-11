import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../store/contexts/userContext'

const LoginModal = () => {


    const [loginForm, setLoginForm] = useState({
        name: '',
        password: ''
    })

    const { loginUser, showLoginModal, setShowLoginModal } = useContext(UserContext)

    const { name, password } = loginForm

    let navigate = useNavigate()


    const onChangePostForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const closeDialog = () => {
        setLoginForm({
            name: '',
            password: ''
        })
        setShowLoginModal(false)
    }


    const handleLoginForm = async (event) => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Modal show={showLoginModal} onHide={closeDialog}>
            <Modal.Header >
                <Modal.Title>Đăng Nhập</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleLoginForm}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" placeholder='Name' onChange={onChangePostForm} value={name} name="name" required aria-describedby='title-help' />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" placeholder='password' onChange={onChangePostForm} value={password} name="password" className='mt-16' />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>Đăng nhập</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default LoginModal