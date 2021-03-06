const connection = require('../database/connection')
const Hash = require('../utils/Hash')
const jwt = require('jsonwebtoken')
const sendMail = require('../services/Mail')

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

            req.userId = decoded.id
            
            next()
        });
    },

    async refreshToken(req, res) {
        const token = await jwt.sign({ id: req.userId }, process.env.SECRET, {
            expiresIn: 1800
        });

        return res.json({
            status: true,
            token
        })
    },

    async forgotPassword(req, res) {
        const { email } = req.body

        if (! email) {
            return res.status(400).json({
                status: false,
                message: "E-mail Missing"
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

        const recoverToken = await jwt.sign({email}, process.env.SECRET, {
            expiresIn: 300
        })

        const mailSent = await sendMail(email, 'Password Recovery', {
            title: 'Password Recovery',
            text: 'Click on the link below to recover your password.',
            buttonLink: `${process.env.APP_URL}/password-recovery/${recoverToken}`,
            buttonText: 'Change Password'
        })

        if (! mailSent.status) {
            return res.status(500).json({
                status: false,
                message: "Error sending email",
                error: mailSent.error
            })
        }

        return res.json({
            status: true,
            message: "Check your e-mail to complete the password recovery"
        })
    },

    async passwordRecovery(req, res) {
        const { token } = req.params
        const { newPassword } = req.body
        
        if (!token) {
            return res.status(400).json({
                status: false,
                message: "Token missing"
            })
        }

        if (! newPassword) {
            return res.status(400).json({
                status: false,
                message: "Password missing"
            })
        }
        
        try {
            const { email } = await jwt.verify(token, process.env.SECRET)

            const password = await Hash.encrypt(newPassword)

            await connection('users')
            .where('email', '=', email)
            .update({ password })

            return res.json({
                status: true,
                message: "Password Updated"
            })
        }
        catch(e) {
            return res.status(500).json({
                status: false,
                message: "Error updating password",
                error: e
            })
        }
    }
}