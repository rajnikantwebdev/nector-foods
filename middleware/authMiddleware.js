const jwt = require("jsonwebtoken");

module.exports = function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token)
    if (!token) return res.status(401).json({ msg: "Token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded: ", decoded)
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ msg: "Invalid token" });
    }
};
