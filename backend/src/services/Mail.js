const nodemailer = require('nodemailer')
const Email = require('email-templates')
const path = require('path')

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
})

const email = new Email({
    message: { from: process.env.SMTP_MAIL_FROM },
    send: true,
    transport: transporter,
    views: {
        root: path.resolve(__dirname, '..', 'templates'),
        options: {
            extension: 'handlebars'
        }
    },
    preview: false
})

function chooseTemplateByContent(content) {
    if (content.buttonText && content.buttonLink)
        return 'default-button'
    else
        return 'default'
}

async function sendMail(to, subject, content) {
    try {
        await email.send({
            template: chooseTemplateByContent(content),
            message: { to, subject: 'RPG Manager | ' + subject },
            locals: content
        })

        return {status: true}
    }
    catch(e) {
        return {
            status: false,
            error: e
        }
    }
}

module.exports = sendMail