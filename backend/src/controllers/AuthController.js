const connection = require('../database/connection')
const Hash = require('../utils/Hash')
const jwt = require('jsonwebtoken')

module.exports = {
    async login(req, res) {
        const { email, password } = req.body

        if (! email || ! password) {
            return res.status(400).json({
                status: false,
                message: "Required Fields Missing"
            })
        }

        const [ user ] = await connection('users')
            .select('*')
            .where('email', '=', email)

        if (! user) {
            return res.status(404).json({
                status: false,
                message: `User with email ${email} not found`
            })
        }

        const passwordCorrect = await Hash.check(password, user.password)

        if (passwordCorrect) {
            const token = await jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 1800
            });

            return res.json({
                status: true,
                token
            })
        }
        else {
            return res.status(401).json({
                status: false,
                message: "Password Incorrect"
            })
        }
    },

    async verifyToken(req, res, next) {
        const token = req.headers['x-access-token']

        if (!token) {
            return res
                .status(401)
                .json({ 
                    status: false, 
                    message: 'No token provided.' 
                })
        }

        await jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                return res
                    .status(500)
                    .json({
                        status: false, 
                        message: 'Failed to authenticate token.'
                    })
            }
            
            next()
        });
    },

    async refreshToken(req, res) {
        const token = req.headers['x-access-token']

        const decodedToken = await jwt.decode(token)

        const newToken = await jwt.sign({ id: decodedToken.id }, process.env.SECRET, {
            expiresIn: 1800
        });

        return res.json({
            status: true,
            token: newToken
        })
    }
}