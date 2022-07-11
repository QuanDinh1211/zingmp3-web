const uploadStoryControler = (req, res) => {

    console.log('uploadStory', req.file)

    return res.redirect('http://localhost:3000/')
}


module.exports = uploadStoryControler