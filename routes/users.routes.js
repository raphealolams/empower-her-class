const express = require("express");
const router = express.Router();
const {
  addUser,
  getUsers,
  deleteUser,
  getUser,
} = require("../controllers/users/index.controller");

const validateBody = (req, res, next) => {
  const body = req.body;
  if (body && body.firstName.length === 0) {
    return res.status(400).json({ message: "First name cannot be empty" });
  }
  if (body && body.lastName.length === 0) {
    return res.status(400).json({ message: "Last name cannot be empty" });
  }
  if (body && body.age.length === 0) {
    return res.status(400).json({ message: "age cannot be empty" });
  }
  if (body && !["male", "female"].includes(body.gender.toLowerCase())) {
    return res
      .status(400)
      .json({ message: "gender can only be male or female" });
  }
  return next();
};

router.post("/",validateBody, addUser);
router.get("/", getUsers);
router.get('/:id', getUser)
router.delete('/:id', deleteUser);


module.exports = router
