import { useContext, useRef, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';


import { SongContext } from '../../store/contexts/songContext'
import { urlimg, urlmp3 } from '../../store/contexts/consts'

const Footer = () => {

    const { songState } = useContext(SongContext)


    let audioElemnt = useRef()

    console.log('audioElemnt', audioElemnt.current);
    const { song } = songState
    let songData = {
        name: '',
        mp3: '',
        album: {
            author: '',
            avatar: ''
        }
    }
    if (song) {
        songData = song
    }
    let { name, mp3, album: { author, avatar } } = songData



    return (
        <div className="footer">
            <div className="render-song">
                <img alt='' src={avatar && `${urlimg}/${avatar}`} />
                <div>
                    <span className="name">{name}</span>
                    <span>
                        {author && author.map((author, index) => {
                            return <a href key={index}>{author}</a>
                        })}
                    </span>
                </div>
            </div>
            <div className="control">
                <div className="btn btn-repeat">
                    <i className="fas fa-redo" />
                </div>
                <div className="btn btn-prev">
                    <i className="fas fa-step-backward" />
                </div>
                <div className="btn btn-toggle-play">
                    {/* <i class="fas fa-pause icon-pause"></i> */}
                    <i className="fas fa-play icon-play" />
                </div>
                <div className="btn btn-next">
                    <i className="fas fa-step-forward" />
                </div>
                <div className="btn btn-random">
                    <i className="fas fa-random" />
                </div>
            </div>
            <div className="actions" />
            <ReactAudioPlayer
                src={`${urlmp3}/${mp3}`}
                // autoPlay
                controls
            />
        </div>
    )
}

export default Footer