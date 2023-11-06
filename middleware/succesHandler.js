class SuccessResponse extends Error {
    constructor(message, data){
        super()
        this.status = 'success'
        this.message = message
        this.data = data
    }
}

module.exports = { SuccessResponse }