const { verifyToken } = require('./jwt.middleware')
const userModel = require('../models/users.models')

const verifyAuthToken = async (req, res, next) => {
    try {
        const { 
            headers
         } = req;
        const token = headers && headers.authorization ? headers.authorization.split(" ")[1] : null

        if (!token) {
            return res.status(401).json({
                message: 'missing or invalid auth token',
                status: false,
                data: {}
            })
        }

        const decoded = verifyToken(token)
        if (!decoded) {
            return res.status(401).json({
                message: 'missing or invalid auth token',
                status: false,
                data: {}
            })
        }

        const user = await userModel.findOneByEmail({
            email: decoded.email,
            isActive: true
        })

        if (!user) {
            return res.status(403).json({
                message: 'Unauthorized',
                status: false,
                data: {}
            })
        }
        user.password = undefined
        req.authUser = user._doc;
        return next()

    } catch (error) {
        return next(error)
    }
}

module.exports = {
    verifyAuthToken
}