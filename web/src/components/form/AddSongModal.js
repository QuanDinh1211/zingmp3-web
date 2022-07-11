import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SongContext } from '../../store/contexts/songContext'
import { AlbumContext } from '../../store/contexts/albumContext'

const AddSongModal = () => {

    const { showAddSongModal, setShowAddSongModal, createSong } = useContext(SongContext)
    const { albumState: { album } } = useContext(AlbumContext)

    let idAlbum = '0'
    if (album) {
        idAlbum = album._id
    }

    let formUpload = useRef()

    const [formDataSong, setFormDataSong] = useState({
        name: '',
        mp3: '',
    })
    const { name, mp3 } = formDataSong


    let navigate = useNavigate()

    const onChangePostForm = event => setFormDataSong({ ...formDataSong, [event.target.name]: event.target.value })

    const onChangefile = event => {
        setFormDataSong({ ...formDataSong, mp3: event.target.files[0].name })
    }

    const closeDialog = () => {
        setFormDataSong({
            name: '',
            mp3: '',
        })
        setShowAddSongModal(false)
    }


    const handleAddSongForm = async (event) => {
        event.preventDefault()

        const formDataSongSubmit = {
            name,
            mp3,
            album: idAlbum,
            playlist: '0'
        }
        try {
            console.log('song data', formDataSongSubmit);
            const albumData = await createSong(formDataSongSubmit)
            formUpload.current.submit()
            if (albumData.success) {
                navigate('http://localhost:3000')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Modal show={showAddSongModal} onHide={closeDialog}>
            <Modal.Header >
                <Modal.Title>Thêm mới Song</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAddSongForm}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control onChange={onChangePostForm} type="text" placeholder='Name Song' name="name" value={name} required aria-describedby='title-help' />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <form ref={formUpload} action='http://localhost:5000/api/upload/mp3' method='post' encType="multipart/form-data">
                        <div class="form-group">
                            <input onChange={onChangefile} type="file" name="mp3" className="form-control" />
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

export default AddSongModal