const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

const users = []

const checkUserId = (request, response, next) => {
  const { id } = request.params
  const index = users.findIndex(user => user.id === id)
  if (index < 0) return response.status(404).json({error: 'User Not found'})
  request.userIndex = index
  request.userId = id
  next()
}

app.get('/', (request, response) => {
  return response.json('OK')
})

app.get('/users/', (request, response) => {
  console.log('A rota foi chamada!')
  return response.json(users)
})

app.post('/users/', (request, response) => {
  const {name, password} = request.body
  const user = {id:uuid.v4(), name, password}
  users.push(user)
  return response.status(201).json(user)
})

app.delete('/users/:id', checkUserId, (request, response) => {
  const index = request.userIndex
  users.splice(index,1)
  return response.status(204).json()
})

app.listen(port, () => {
  console.log(`🚀 server started on port ${port}`)
})