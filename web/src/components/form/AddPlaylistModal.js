import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import RenderAuthorSearch from '../contents/staticComponents/renderSeach/RenderAuthorSearch'

import { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlaylistContext } from '../../store/contexts/playlistContext'

const AddPlaylistModal = () => {

    const { showAddPlaylistModal, setShowAddPlaylistModal, createPlaylist } = useContext(PlaylistContext)

    let formUpload = useRef()

    const [formDataPlaylist, setFormDataPlaylist] = useState({
        name: '',
        description: '',
        author: '',
        avatar: '',
    })

    const { name, description, author } = formDataPlaylist

    let navigate = useNavigate()

    const onChangePostForm = event => setFormDataPlaylist({ ...formDataPlaylist, [event.target.name]: event.target.value })

    const onChangefile = event => {
        setFormDataPlaylist({ ...formDataPlaylist, avatar: event.target.files[0].name })
    }

    const closeDialog = () => {
        setFormDataPlaylist({
            name: '',
            description: '',
            author: '',
            avatar: '',
        })
        setShowAddPlaylistModal(false)
    }

    const handleSubmitAvar = (event) => {

    }

    const handleAddPlaylistForm = async (event) => {
        event.preventDefault()

        try {
            const playlistData = await createPlaylist(formDataPlaylist)
            formUpload.current.submit()
            if (playlistData.success) {
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const [showHistory, setShowHistory] = useState(false)

    const handleOnclikInputAuthor = (event) => {
        let result = event.target.closest('.header__seach-history--item')
        console.log('result', result);
        if (result) {
            event.stopPropagation()
            setShowHistory(false)
        }
    }

    const handleOnclikFrom = (event) => {
        let result = event.target.closest('.showhistory')
        if (result) {
            setShowHistory(true)
        } else {
            setShowHistory(false)
        }
    }



    return (
        <Modal show={showAddPlaylistModal} onHide={closeDialog} onClick={handleOnclikFrom}>
            <Modal.Header >
                <Modal.Title>Th??m m???i Playlist</Modal.Title>
            </Modal.Header>
            {/* <Form method='POST' action='http://localhost:5000/api/playlist/createPlaylist' enctype="multipart/form-data"> */}
            <Form onSubmit={handleAddPlaylistForm}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control onChange={onChangePostForm} type="text" placeholder='Name Playlist' name="name" value={name} required aria-describedby='title-help' />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control onChange={onChangePostForm} type="text" placeholder='description Playlist' value={description} name="description" className='mt-16' />
                        <Form.Text muted></Form.Text>
                    </Form.Group>
                    <form ref={formUpload} onSubmit={handleSubmitAvar} action='http://localhost:5000/api/upload/avatar' method='post' encType="multipart/form-data">
                        <div class="form-group">
                            <input onChange={onChangefile} type="file" name="avatar" className="form-control" placeholder="Enter file" />
                        </div>
                    </form>
                    <Form.Group className='position-relative showhistory' onClick={handleOnclikInputAuthor}>
                        <Form.Control onChange={onChangePostForm} autoComplete="off" type="text" placeholder='author Playlist' value={author} name="author" className='mt-16' />
                        {showHistory && <RenderAuthorSearch setDataInput={setFormDataPlaylist} dataInput={formDataPlaylist} />}
                        <Form.Text muted></Form.Text>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>Th??m</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPlaylistModal