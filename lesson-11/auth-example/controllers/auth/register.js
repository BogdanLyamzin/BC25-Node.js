const bcrypt = require("bcryptjs")
const {nanoid} = require("nanoid")

const {User} = require("../../models/user")

const {HttpError, sendEmail} = require("../../helpers")

const {BASE_URL} = process.env;

const register = async(req, res) => {
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const verificationCode = nanoid()

    const newUser = await User.create({name, email, password: hashPassword, verificationCode});

    const mail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify</a>`
    }

    await sendEmail(mail)

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

module.exports = register;