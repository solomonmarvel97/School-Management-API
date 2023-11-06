class ErrorResponse extends Error {
    constructor(message, data){
        super()
        this.status = 'error'
        this.message = message
        this.data = data
    }
}

module.exports = { ErrorResponse }