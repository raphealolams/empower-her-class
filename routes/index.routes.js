const express = require("express");
const router = express.Router();
const userRoute = require('./users.routes')
const authRoutes = require('./auth.routes');

router.use('/users', userRoute)
router.use('/auth', authRoutes)


module.exports = router