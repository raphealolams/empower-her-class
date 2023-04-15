const storage = []
const addUser = (req, res, next) => {
  try {
    const user = { ...req.body, id: storage.length + 1 };
    storage.push(user);
    res.status(200).json({ message: "user created", data: user });
  } catch (error) {
    return next(error);
  }
};

const getUsers = (req, res, next) => {
  try {
    res
      .status(200)
      .json({ message: "users successfully retrieved", data: storage });
  } catch (error) {
    return next(error);
  }
};

const getUser = (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = storage.find((item) => item.id === parseInt(userId));
    res
      .status(200)
      .json({ message: "user successfully retrieved", data: user });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = (req, res, next) => {
  try {
    const userId = req.params.id;
    storage.splice(storage.findIndex(item => item.id === parseInt(userId)), 1)
    res.status(204).json({ message: "user deleted" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
    addUser,
    getUsers,
    deleteUser,
    getUser
};
