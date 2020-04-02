const { Router } = require('express')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.delete('/users/:id', AuthController.verifyToken, UserController.delete)

routes.post('/login', AuthController.login)

routes.post('/refresh-token', AuthController.verifyToken, AuthController.refreshToken)

routes.get('/restrito', AuthController.verifyToken, (req, res) => {
    res.send('Informacao ultra secreta')
})

module.exports = routes