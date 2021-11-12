module.exports = (err, req, res, next) => {
    let status = 200;
    let message = err.message;

    res.status(status).json({ message });
}