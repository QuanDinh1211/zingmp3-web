import LiveRadio from '../staticComponents/radioItem/LiveRadio'
import RadioForder from '../staticComponents/radioItem/FoderRadio'

const Radio = () => {
    return (
        <>
            <LiveRadio />
            <div className="radio-wrapper">
                <h2 className="title-box">Các tập nổi bật</h2>
                <RadioForder />
            </div>
        </>
    )
}

export default Radio