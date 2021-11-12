module.exports = (err, req, res, next) => {
    let status = 200;
    let message = err.message;

    if (err.name === 'NOT_FOUND') {
        status = 400;
        message = 'Data not found';
    }

    res.status(status).json({ message });
}