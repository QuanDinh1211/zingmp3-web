import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlbumContext } from '../../store/contexts/albumContext'

const AddAlbumModal = () => {

    const { showAddAlbumModal, setShowAddAlbumModal, createAlbum } = useContext(AlbumContext)

    let formUpload = useRef()

    const [formDataAlbum, setFormDataAlbum] = useState({
        name: '',
        description: '',
        author: '',
        avatar: '',
    })

    const { name, description, author } = formDataAlbum

    let navigate = useNavigate()

    const onChangePostForm = event => setFormDataAlbum({ ...formDataAlbum, [event.target.name]: event.target.value })

    const onChangefile = event => {
        setFormDataAlbum({ ...formDataAlbum, avatar: event.target.files[0].name })
    }

    const closeDialog = () => {
        setFormDataAlbum({
            name: '',
            description: '',
            author: '',
            avatar: '',
        })
        setShowAddAlbumModal(false)
    }

    const handleSubmitAvar = (event) => {

    }

    const handleAddPlaylistForm = async (event) => {
        event.preventDefault()
        console.log(formDataAlbum);

        try {
            const albumData = await createAlbum(formDataAlbum)
            formUpload.current.submit()
            if (albumData.success) {
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal show={showAddAlbumModal} onHide={closeDialog}>
            <Modal.Header >
                <Modal.Title>Thêm mới Album</Modal.Title>
            </Modal.Header>
            {/* <Form method='POST' action='http://localhost:5000/api/playlist/createPlaylist' enctype="multipart/form-data"> */}
            <Form onSubmit={handleAddPlaylistForm}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control onChange={onChangePostForm} type="text" placeholder='Name Album' name="name" value={name} required aria-describedby='title-help' />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control onChange={onChangePostForm} type="text" placeholder='description Album' value={description} name="description" className='mt-16' />
                        <Form.Text muted></Form.Text>
                    </Form.Group>
                    <form ref={formUpload} onSubmit={handleSubmitAvar} action='http://localhost:5000/api/upload/avatar' method='post' encType="multipart/form-data">
                        <div class="form-group">
                            <input onChange={onChangefile} type="file" name="avatar" className="form-control" placeholder="Enter file" />
                        </div>
                    </form>
                    <Form.Group>
                        <Form.Control onChange={onChangePostForm} type="text" placeholder='author Album' value={author} name="author" className='mt-16' />
                        <Form.Text muted></Form.Text>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>Thêm</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddAlbumModal