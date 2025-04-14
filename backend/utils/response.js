const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        statusCode,
        message,
        payload: data || null,
    })
}

module.exports = response