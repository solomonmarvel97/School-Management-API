const { logger } = require("../../config/logger")
const { ParentService } = require("../../service/parent.service")
const { respond } = require("../../utils/respond")


class ParentController {

    // Retrieve all  Parent
    static async listParent(req, res) {
        try {
            const parent = await ParentService.listParent()
            if (!parent) {
                return respond(res, 409, 'Parent not retrieved')
            }
            return respond(res, 200, 'parents successfully retrieved', { parent })
        } catch (err) {
            logger.error(`Failed to retrieve parents ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Get a Particular Parent
    static async getParent(req, res) {
        try {
            const parentId = req.params.id
            const parent = await ParentService.getParent(parentId)
            if (!parent) {
                return respond(res, 404, 'Parent not found')
            }
            return respond(res, 200, 'Parent retrieved successfully', { parent })
        } catch (err) {
            logger.error(`Failed to retrieve parents ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }

    //Search by name and filter by religion
    static async searchParent(req, res) {
        try {
            const { name, religion } = req.query
            const parent = await ParentService.searchParent(name, religion)
            if (!parent) {
                return respond(res, 404, 'Parent not found')
            }
            return respond(res, 200, 'parent retrieved successfully', { parent })
        } catch (err) {
            logger.error(`Failed to retrieve parent ${err}`)
            return respond(res, 500, 'Internal server error')
        }
    }
}

module.exports = { ParentController }