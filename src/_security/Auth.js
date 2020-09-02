const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(401).json({
            status: "ERROR",
            code: "UNAUTHORIZED"
        });
    }
}

module.exports.checkJWT = (req, res, next) => {
    var token = req.token;

    jwt.verify(token, process.env.JWT_SECRET, function(err, data) {
        if(!err) {
            next();
        } else {
            res.status(401).json({
                status: "ERROR",
                code: "UNAUTHORIZED"
            });
        }
    })

}

module.exports.sendUnauthorized = (res) => {
    res.status(401).json({
        status: "ERROR",
        code: "UNAUTHORIZED"
    });
}
