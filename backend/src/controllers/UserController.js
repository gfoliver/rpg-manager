const connection = require('../database/connection')
const Hash = require('../utils/Hash')
const generateUniqueUsername = require('../utils/generateUniqueUsername')

module.exports = {
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

            return res.json({
                status: true,
                id
            })
        }
        catch(e) {
            return res.status(500).json({
                status: false,
                message: "Error registering user"
            })
        }
    },

    async delete(req, res) {
        const { id } = req.params


    }
}