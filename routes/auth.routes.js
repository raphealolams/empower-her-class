const express = require("express");
const router = express.Router();
const {
register,
login,
me
} = require("../controllers/auth/index.controller");

const {verifyAuthToken} = require('../middleware/verifyToken.middleware')


router.post("/", register);
router.post("/login", login);
router.get("/", verifyAuthToken, me);

// router.get("/", getUsers);
// router.get('/:id', getUser)
// router.delete('/:id', deleteUser);


module.exports = router
