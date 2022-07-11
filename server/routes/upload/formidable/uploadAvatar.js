const formidable = require('formidable');

const uploadAvatarControler = (req, res) => {

    // const form = new formidable.IncomingForm();

    // form.parse(req);

    // form.on('fileBegin', function (name, file) {
    //     file.path = __dirname + '/public/img/' + file.name;
    // });

    // form.on('file', function (name, file) {
    //     console.log('Uploaded ' + file.name);
    // });

    console.log('uploadAvatar', req.file)

    return res.redirect('http://localhost:3000/')
}


module.exports = uploadAvatarControler