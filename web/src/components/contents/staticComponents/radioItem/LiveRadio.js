

const LiveRadio = () => {
    return (
        <div className="list-live row">
            <div className="col-2">
                <div className="live-item">
                    <div className="avart-radio">
                        <div className="avar">
                            <img src={require("../../../../acsess/img/avatar-song/vu2.png")} alt='' />
                            <div className="avar-hover">
                                <i className="far fa-play-circle" />
                            </div>
                        </div>
                        <div className="user">
                            <img src={require("../../../../acsess/img/avatar-song/m2.png")} alt='' />
                        </div>
                        <div className="live-box">
                            <span>LIVE</span>
                        </div>
                    </div>
                    <div className="title-radio">
                        <span className="name">XONE Radio</span>
                        <span>47 đang nghe</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveRadio