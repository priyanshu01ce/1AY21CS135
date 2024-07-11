module.exports = (req, res, next) => {
    res.setTimeout(500, () => {
        res.status(503).json({
            error: 'Request timed out'
        });
    });
    next(); 
};
