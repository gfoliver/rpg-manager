const fs = require('fs')
require('dotenv-safe').config({
    allowEmptyValues: true
})

async function getTemplateContent(template) {
    const data = await fs.readFileSync(template, 'utf8')
    return data
}

async function parseContentToTemplate(content) {
    let html = await getTemplateContent('templates/email.html')
    let button = await getTemplateContent('templates/button.html')

    html = html.replace('${appUrl}', process.env.APP_URL)

    const { title, text, buttonLink, buttonText } = content

    if (title)
        html = html.replace('${title}', title)
    
    if (text)
        html = html.replace('${text}', text)
    
    if (buttonLink && buttonText) {
        button = button.replace('${link}', buttonLink).replace('${text}', buttonText)
        html = html.replace('<!--${button}-->', button)
    }

    return html
}

module.exports = parseContentToTemplate