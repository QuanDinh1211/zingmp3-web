import React from 'react'

const SongItemZingChat = () => {
    return (
        <div className="song">
            <div className="song-leff">
                <h3>1</h3>
                <i className="fas fa-minus" />
                <div className="song-avatar">
                    <img src={require("../../../../../acsess/img/avatar-song/m2.png")} alt='' />
                    <div className="avatar-hover">
                        <i className="fas fa-play" />
                    </div>
                </div>
                <div className="song-name">
                    <span className="name">Đám cưới nha?</span>
                    <span>Hồng Thanh, DJ Mie</span>
                </div>
            </div>
            <div className="song-right">
                <span>Đám Cưới Nha? (Single)</span>
                <div className="right-actions">
                    <span className="time">02:55</span>
                </div>
            </div>
            <div className="hover-song">
                <i className="far fa-heart" />
                <i className="fas fa-microphone-alt" />
                <i className="fas fa-ellipsis-h" />
            </div>
        </div>
    )
}

export default SongItemZingChat