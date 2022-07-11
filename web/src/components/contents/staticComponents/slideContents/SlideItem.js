import React from 'react'

const SlideItem = ({ img1, img2, index }) => {
    const classContainer = index === 0 ? `carousel-item active` : 'carousel-item'
    return (
        <div className={classContainer}>
            <img alt='' src={require(`../../../../acsess/img/${img1}`)} />
            <img alt='' src={require(`../../../../acsess/img/${img2}`)} />
        </div>
    )
}

export default SlideItem