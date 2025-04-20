const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const generateToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];
    if (!token) {
        res.status(403).send('A token is required for authentication');
        return res.redirect('/login'); 
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        res.status(401).send('Invalid Token');
        return res.redirect('/login'); 
    }
    return next();
};


module.exports = { generateToken , verifyToken };