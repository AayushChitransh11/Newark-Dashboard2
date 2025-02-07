const jwt = require("jsonwebtoken");


const protect = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1]; 
    } else {
        return res.status(401).json({ message: "Token must be a Bearer token" });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

       
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};


const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.Role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

module.exports = { protect, authorize };
