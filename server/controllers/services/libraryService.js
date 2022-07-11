const Library = require('../../models/Library')
const handleDeleteAvatar = require('../../public/handleDeleteFile')


class AlbumService {
    hanleCreateLibrary = async (data, res) => {
        const { product, category, user } = data

        if (!product || !user) {
            return res.status(400).json({
                success: false,
                message: "missing user or product"
            })
        }
        try {
            const library = new Library(data)
            await library.save()
            return library
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    handleGetListLibrary = async (filter, res) => {
        try {
            const listLibrary = await Library.find(filter)
            return listLibrary
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }




    hanleDeleteLibrary = async (filter, res) => {
        try {
            const deleteLibrary = await Library.findOneAndDelete(filter)
            if (!deleteLibrary) {
                return res.status(401).json({ success: false, message: 'Library not found' })
            }

            return deleteLibrary
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }



}

module.exports = new AlbumService