const jwt = require('jsonwebtoken')


const verifyAdmin = (req, res, next) => {
    try {
        console.log('hiiii');
        const jwtToken = jwt.verify(req.cookies.commenderAdmin, process.env.TOKEN_KEY)

        if (jwtToken) {
            console.log('true');
            next()
        } else {
            console.log('false');
            res.status(400).json({ success: false, error: true, message: 'admin token key get lost' })
        }
    } catch (error) {
        console.log('error');
        throw error;
    }
}

module.exports = { verifyAdmin }

