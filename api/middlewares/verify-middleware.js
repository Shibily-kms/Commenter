const jwt = require('jsonwebtoken')


const verifyAdmin = (req, res, next) => {
    try {
        const jwtToken = jwt.verify(req.cookies.commenterAdmin, process.env.TOKEN_KEY)

        if (jwtToken) {
            next()
        } else {
            res.status(400).json({ success: false, error: true, message: 'admin token key get lost' })
        }
    } catch (error) {
        throw error;
    }
}

const verifyUser = (req, res, next) => {
    try {
        const jwtToken = jwt.verify(req.cookies.commenter, process.env.TOKEN_KEY)

        if (jwtToken) {
            next()
        } else {
            res.status(400).json({ success: false, error: true, message: 'user token key get lost' })
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { verifyAdmin, verifyUser }


