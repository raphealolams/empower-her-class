const express = require('express')
const app = express()
const port = 3000

const storage = []

const routes = express.Router()

app.use(express.json())
routes.get("/v1", (req, res) => {
    res.status(200).json({message: 'Hello World!', headers: req.headers })
})

const validateBody = (req, res, next) => {
  const body = req.body
  if (body && body.firstName.length === 0) {
    return res.status(400).json({message: 'First name cannot be empty'})
  }
  if (body && body.lastName.length === 0) {
    return res.status(400).json({message: 'Last name cannot be empty'})
  }
  if (body && body.age.length === 0) {
    return res.status(400).json({message: 'age cannot be empty'})
  }
  if (body && !['male', 'female'].includes(body.gender.toLowerCase())) {
    return res.status(400).json({message: 'gender can only be male or female'})
  }
  return next()
}

routes.post("/v1/users", validateBody, (req, res) => {
  const user = {...req.body, id: storage.length + 1}
  storage.push(user)
  res.status(200).json({ message: 'user created', data: user })
})
routes.get("/v1/users", (req, res) => {
  res.status(200).json({message: 'users successfully retrieved', data: storage})
})
routes.get("/v1/users/:id", (req, res) => {
  const userId =  req.params.id
  const user = storage.find(item => item.id === parseInt(userId))
  res.status(200).json({message: 'user successfully retrieved', data: user})
})
routes.patch("/v1/users/:id", (req, res) => {
  const userId =  req.params.id
  const body = req.body;
  // storage = storage.map(item => {
  //   if (item.id === parseInt(userId)) {
  //     Object.keys(body).map(user => {
  //       item[user] = body[user]
  //     })
  //   }
  //   return item
  // })
  for (let user in storage) {
      if (user.id === parseInt(userId)) {
      Object.keys(body).map(item => {
        user[item] = body[item]
      })
    }
  }
  res.status(200).json({message: 'user successfully updated', data: {}})
})
routes.delete("/v1/users/:id", (req, res) => {
  const userId =  req.params.id
  const newStorage = storage.filter((item) => item.id !== parseInt(userId))
  storage = newStorage
  res.status(204).json({message: 'user deleted'})
})






app.use(routes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// create customer 
// v1/customers POST
// v1/customers/:customerId GET
// v1/customers GET



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})