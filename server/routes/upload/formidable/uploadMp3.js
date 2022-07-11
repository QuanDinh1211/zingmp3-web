const uploadMp3Controler = (req, res) => {

    console.log('uploadMp3', req.file)

    return res.redirect('http://localhost:3000/')
}


module.exports = uploadMp3Controler