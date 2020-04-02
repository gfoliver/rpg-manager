const bcrypt = require('bcrypt')

module.exports = {
    async encrypt(password) {
        try {
            const hash = await bcrypt.hash(password, 10)
            return hash;
        } 
        catch(error) {
            return false;
        }
    },
    async check(password, hash) {
        try {
            const result = await bcrypt.compare(password, hash)
            return result;
        } 
        catch (error) {
            return false;
        }
    }
}