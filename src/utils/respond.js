function respond(res, statusCode = 200, message, data = {}) {
    const successCodes = [200, 201]
    return res.status(statusCode).send({
        status: successCodes.includes(statusCode) ? "success" : "error",
        message: message,
        data: data

    })
}


module.exports = { respond }
