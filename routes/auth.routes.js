const express = require("express");
const router = express.Router();
const {
register
} = require("../controllers/auth/index.controller");


router.post("/", register);
// router.get("/", getUsers);
// router.get('/:id', getUser)
// router.delete('/:id', deleteUser);


module.exports = router
