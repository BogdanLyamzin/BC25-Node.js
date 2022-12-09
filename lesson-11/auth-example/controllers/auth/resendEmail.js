const {User} = require("../../models/user")

const {HttpError, sendEmail} = require("../../helpers")

const {BASE_URL} = process.env;

const resendEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email})
    if(!user) {
        throw HttpError(404)
    }

    const mail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify</a>`
    }

    await sendEmail(mail)

    res.status({
        message: "resend verify link"
    })
    
}

module.exports = resendEmail