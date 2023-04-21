const userModel = require('../../models/users.models')


const register = async (req, res, next) => {
    try {
        const { body } = req;
        const _user = new userModel(body)
        let user = await _user.save()
        user.password = undefined
        return res.status(201).json({
            message: 'user account created',
            status: true,
            data: user._doc
        })
    } catch (error) {
        return next(error)
    }
}


module.exports = {
    register
}