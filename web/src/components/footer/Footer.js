import { useContext, useRef, useState } from 'react'


import { SongContext } from '../../store/contexts/songContext'
import { urlimg, urlmp3 } from '../../store/contexts/consts'
import AudioItem from './AudioItem'

const Footer = () => {
    // let mp3Song = "henmotmai.mp3"
    // const [mp3Song, setMp3Song] = useState('hetthuongcannho.mp3')

    const { songState, songPlay, setSongPlay } = useContext(SongContext)


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
    let body = <AudioItem />
    if (mp3) {
        body = <AudioItem mp3={mp3} />
        // mp3Song = mp3
        // setMp3Song(mp3)
        // console.log('mp3Song', mp3Song);
    }
    const audio = document.getElementById('audio')

    if (audioElemnt.current) {
        if (songPlay) {
            console.log('play');
            // audio.play()
        } else {
            // audioElemnt.current.pause()
            console.log('pause');
        }
    }

    console.log('mp3', mp3);
    // console.log('mp3Song', mp3Song);

    return (
        <div className="footer">
            <div className="render-song">
                <img alt='' src={avatar && `${urlimg}/${avatar}`} />
                <div>
                    <span className="name">{name}</span>
                    <span>
                        {author && author.map((author, index) => {
                            return <a href='' key={index}>{author}</a>
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
            {/* <audio ref={audioElemnt} id="audio" src={mp3 && `${urlmp3}/${mp3}`} /> */}
            <audio id='audio' controls>
                <source src={'http://localhost:5000/mp3/' + mp3} type="audio/ogg" />
                <source src={'http://localhost:5000/mp3/' + mp3} type="audio/mpeg" />
            </audio>
            {/* {body} */}
        </div>
    )
}

export default Footer