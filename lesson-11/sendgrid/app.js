const sgMail = require("@sendgrid/mail")
require("dotenv").config()

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY)

const email = {
    to: "seyas64350@covbase.com",
    from: "bogdan.lyamzin.d@gmail.com",
    subject: "Verify your email",
    html: "<p>Click here to verify email</p>"
}

sgMail.send(email)
    .then(()=> console.log("Email send success"))
    .catch(error => console.log(error.message))