const connection = require('../database/connection')
const Hash = require('../utils/Hash')
const generateUniqueUsername = require('../utils/generateUniqueUsername')
const sendMail = require('../services/Mail')

module.exports = {
    async index(req, res) {
        const users = await connection('users').select('*')

        return res.json({
            status: true,
            users
        })
    },

    async create(req, res) {

        const { name, email, password } = req.body

        if (!name || ! email || ! password) {
            return res.status(400).json({
                status: false,
                message: "Required Fields Missing"
            })
        }

        const emailAlreadyExists = await connection('users')
            .select('email')
            .where('email', '=', email)

        if (emailAlreadyExists.length) {
            return res.status(401).json({
                status: false,
                message: "Email already registered"
            })
        }

        const encryptedPassword = await Hash.encrypt(password)

        
        try {
            const id = await connection('users').insert({
                name,
                email,
                password: encryptedPassword,
                first_name: name.split(' ')[0],
                level: 1
            })

            const username = generateUniqueUsername(id)

            await connection('users')
                .where('id', '=', id)
                .update({
                    username
                })

            const mailSent = await sendMail(email, 'Welcome to RPG Manager', {
                title: 'Welcome to RPG Manager',
                text: `Greetings, ${name}. We're glad you are joining our platform!`
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
                id
            })
        }
        catch(e) {
            console.log(e);
            return res.status(500).json({
                status: false,
                message: "Error registering user"
            })
        }
    },

    async delete(req, res) {
        const { id } = req.params
        const { userId } = req
        
        if (id != userId) {
            return res.status(401).json({
                status: false,
                message: "User not authorized"
            })
        }

        const affected = await connection('users')
            .where('id', '=', id)
            .del()

        if (! affected) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            })
        }

        return res.json({
            status: true,
            message: "User deleted"
        })
    }
}