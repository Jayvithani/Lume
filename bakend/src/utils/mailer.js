const nodemailer = require("nodemailer")
require("dotenv").config()
const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_NAME,
        pass:process.env.EMAIL_PASS
         }
})

module.exports = transport