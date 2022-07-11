

const RadioForderItem = () => {
    return (
        <div className="col-4">
            <div className="radio-item">
                <div className="radio-avatar">
                    <img src={require("../../../../../acsess/img/avatar-song/m2.png")} alt='' />
                    <div className="avartar-hover">
                        <i className="fas fa-play" />
                    </div>
                </div>
                <div className="radio-name">
                    <span className="name">#38 MIN - Hiện tại đang trong tình yêu</span>
                    <span>XONE with Status</span>
                    <span>04/04/2022 - 60 phút</span>
                </div>
                <div className="radio-hover">
                    <i className="fas fa-bookmark" />
                    <i className="fas fa-ellipsis-h" />
                </div>
            </div>
        </div>
    )
}

export default RadioForderItem