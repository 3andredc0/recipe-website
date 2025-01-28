const jwt=require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    token = token.split(" ")[1];
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded);
            });
        });
        // After verifying token
        req.user = { 
            id: decoded.id, 
            email: decoded.email, 
            admin: decoded.admin
        };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
module.exports=verifyToken;