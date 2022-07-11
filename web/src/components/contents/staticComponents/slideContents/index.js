import SlideItem from './SlideItem'

const Slide = () => {

    const slideItem = [
        {
            img1: 'hoangdung.png',
            img2: 'bichphuong.png',
        },
        {
            img1: 'bichphuong.png',
            img2: 'nguyenha.png',
        },
        {
            img1: 'nguyenha.png',
            img2: 'hoangdung.png',
        },
    ]

    return (
        <div id="slide" className="carousel-container carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {slideItem.map((item, index) => {
                    const { img1, img2 } = item
                    return <SlideItem key={index} index={index} img1={img1} img2={img2} />
                })}
            </div>
            <a className="carousel-control-prev" href="#slide" data-slide="prev">
                <span className="carousel-control-prev-icon" />
            </a>
            <a className="carousel-control-next" href="#slide" data-slide="next">
                <span className="carousel-control-next-icon" />
            </a>
        </div >
    )
}

export default Slide