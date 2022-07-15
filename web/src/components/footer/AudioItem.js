
const AudioItem = ({ mp3 }) => {
    return (
        <audio id='audio' controls>
            <source src={'http://localhost:5000/mp3/' + mp3} type="audio/ogg" />
            <source src={'http://localhost:5000/mp3/' + mp3} type="audio/mpeg" />
        </audio>
    )
}

export default AudioItem