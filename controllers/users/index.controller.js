const addUser = (req, res, next) => {
   try {
     const user = {...req.body, id: storage.length + 1}
  storage.push(user)
  res.status(200).json({ message: 'user created', data: user })
   } catch (error) {
    return next(error)
   }
}