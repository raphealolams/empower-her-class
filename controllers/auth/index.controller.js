const userModel = require('../../models/users.models')
const { sign } = require('../../middleware/jwt.middleware')

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

const login = async (req, res, next) => {
    try{
        const { body } = req
    const user = await userModel.findOneByEmail({ email: body.email, isActive: true })

    if (!user) {
        return res.status(401).json({
            message: 'email or password invalid',
            status: false,
            data: {},
        })
    }

    if (!user.comparePasswordHash(body.password)) {
        return res.status(401).json({
            message: 'email or password invalid',
            status: false,
            data: {},
        })
    }
    user.password = undefined
    return res.status(200).json({
        message: "login successful",
        status: true,
        data: {
            token: sign({
                email: user._doc.email
            }),
            ...user._doc
        }
    })
    } catch (error) {
        return next(error)
    }

}

const me = (req, res, next) => {
    try {
        const { authUser } = req;

        return res.status(200).json({
            message: "user data fetched",
            status: true,
            data: {
                ...authUser
            }
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    register,
    login,
    me
}