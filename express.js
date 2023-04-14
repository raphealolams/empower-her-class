const express = require('express')
const app = express()
const port = 3000

const routes = express.Router()

app.use(express.json())
routes.get("/v1", (req, res) => {
    res.status(200).json({message: 'Hello World!', headers: req.headers })
})

const validateBody = (req, res, next) => {
  const body = req.body
  const header = req.headers // 
  const query = req.query
  const params = req.params

  if (body && body.firstName.length === 0) {
    return res.status(400).json({message: 'First name cannot be empty'})
  }
  return next()
}

routes.post("/v1", validateBody,  (req, res) => res.status(200).json({message: 'ok'}))


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