const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: String,
    },
    password: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
})


UserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12)
    }

    next()
})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel