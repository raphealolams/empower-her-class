const jwt =  require('jsonwebtoken')

const sign = (payload) => {
    return jwt.sign(payload, 'test-empower-her', {expiresIn: '1h'})
}

const verifyToken = (token) => {
    return jwt.verify(token, 'test-empower-her')
}


module.exports = {
    sign,
    verifyToken
}