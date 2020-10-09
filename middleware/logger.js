const logger = (req, res, next) => {
    console.log(`${req.method} from ${req.ip + '-' + req.hostname} to ${req.protocol} ${req.originalUrl}`);
    next();
}

module.exports = logger;