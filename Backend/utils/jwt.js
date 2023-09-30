const jwt = require('jsonwebtoken')



const createUserToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token
}

const verifyUserToken = (req, res, next) => {
    const Token = req.header('auth-token');
    if (!Token) return res.status(401).send('Access denied')
    try {
        const verified = jwt.verify(Token, process.env.JWT_SECRET)
        req.user = verified
        console.log("Verified");
        next()
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid Token')
    }
}


module.exports = {
    createUserToken,
    verifyUserToken
}