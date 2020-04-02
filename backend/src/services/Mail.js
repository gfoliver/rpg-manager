const nodemailer = require('nodemailer')
const parseContentToHTML = require('../utils/parseContentToHTML')

module.exports = {
    async sendMail(to, subject, content) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD
                }
            })
            
            let html = await parseContentToHTML(content)

            await transporter.sendMail({
                from: process.env.SMTP_MAIL_FROM,
                to,
                subject: 'RPG Manager | ' + subject,
                html
            });

            return {status: true};
        }
        catch(e) {
            return {
                status: false,
                error: e
            }
        }
    }
}