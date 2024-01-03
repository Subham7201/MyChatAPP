const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

async function getUserDataFromRequest(req) {
    return new Promise((resolve, reject) => {
        const token = req.cookies?.token;
        if (token) {
            jwt.verify(token, jwtSecret, {}, (err, userData) => {
                if (err) reject(err);
                resolve(userData);
            });
        } else {
            reject('no token');
        }
    });
}

module.exports = { getUserDataFromRequest };
