var nodemailer = require("nodemailer");
let transport = nodemailer.createTransport({
  direct: true,
  host: process.env.mailProvider,
  port: process.env.mailPort,
  auth: {
    user: process.env.mailUser,
    pass: process.env.mailPass
  },
  secure: true
})

module.exports = transport;