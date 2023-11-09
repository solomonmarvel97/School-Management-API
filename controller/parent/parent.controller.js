const service = require('../../service/index')
const { ErrorResponse } = require('../../middleware/errorHandler')
const { SuccessResponse } = require('../../middleware/succesHandler')

class Parent {

    //Return a List of Parent
    static async listParent(req, res) {
        try {
            const parent = await service.parentService.listParent()
            if (!parent) {
                return res.status(400).json(new ErrorResponse('parent not retrieved'))
            }
            return res.status(200).json(new SuccessResponse('parents successfully retrieved', parent))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Error retrieving parent'))

        }

    }

    //Get a Particular Parent
    static async getParent(req, res) {
        try {
            const parentId = req.params.id
            const parent = await service.parentService.getParent(parentId)
            if (!parent) {
                return res.status(404).json(new ErrorResponse('parent not found'))
            }
            return res.status(200).json(new SuccessResponse('parent successfully retrieved', parent))
        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Internal server error'))

        }
    }


    //Search by name and filter by religion
    static async searchParent(req, res) {
        try {
            const { name, religion } = req.query
            const parent = await service.parentService.searchParent(name, religion)
            if (!parent) {
                return res.status(404).json(new ErrorResponse('parent not found'))
            }
            return res.status(200).json(new SuccessResponse('parent successfully found', parent))

        } catch (err) {
            console.log(err)
            return res.status(500).json(new ErrorResponse('Internal server error'))

        }
    }
}

module.exports = { Parent }