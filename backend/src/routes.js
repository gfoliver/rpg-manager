const { Router } = require('express')
const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthController')

const routes = Router()

routes.post('/users', UserController.create)

routes.post('/login', AuthController.login)

routes.post('/refresh-token', AuthController.verifyToken, AuthController.refreshToken)

routes.get('/restrito', AuthController.verifyToken, (req, res) => {
    res.send('Informacao ultra secreta')
})

module.exports = routes