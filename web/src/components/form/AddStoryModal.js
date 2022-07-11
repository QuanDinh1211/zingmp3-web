import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoryContext } from '../../store/contexts/storyContext'

const AddStoryModal = () => {

    const { createStory, showAddStoryModal, setShowAddStoryModal } = useContext(StoryContext)

    let formUpload = useRef()

    const [formDataStory, setFormDataStory] = useState({
        description: '',
        content: '',
    })

    const { description } = formDataStory

    let navigate = useNavigate()

    const onChangePostForm = event => setFormDataStory({ ...formDataStory, [event.target.name]: event.target.value })

    const onChangefile = event => {
        setFormDataStory({ ...formDataStory, content: event.target.files[0].name })
    }

    const closeDialog = () => {
        setFormDataStory({
            description: '',
            content: '',
        })
        setShowAddStoryModal(false)
    }


    const handleAddStoryForm = async (event) => {
        event.preventDefault()

        try {
            const albumData = await createStory(formDataStory)
            formUpload.current.submit()
            if (albumData.success) {
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal show={showAddStoryModal} onHide={closeDialog}>
            <Modal.Header >
                <Modal.Title>Đăng Story</Modal.Title>
            </Modal.Header>
            {/* <Form method='POST' action='http://localhost:5000/api/playlist/createPlaylist' enctype="multipart/form-data"> */}
            <Form onSubmit={handleAddStoryForm}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control onChange={onChangePostForm} type="text" placeholder='Name Album' name="description" value={description} required aria-describedby='title-help' />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <form ref={formUpload} action='http://localhost:5000/api/upload/content' method='post' encType="multipart/form-data">
                        <div class="form-group">
                            <input onChange={onChangefile} type="file" name="content" className="form-control" placeholder="Enter file" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>Thêm</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddStoryModal