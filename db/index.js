const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/empower_her', {
        useNewUrlParser: true,
    })
}

module.exports = connect