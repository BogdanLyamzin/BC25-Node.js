const register = require("./register")
const login = require("./login")
const getCurrent = require("./getCurrent")
const logout = require("./logout")
const updateAvatar = require("./updateAvatar")
const verify = require("./verify")
const resendEmail = require("./resendEmail")

module.exports = {
    register,
    verify,
    login,
    getCurrent,
    logout,
    updateAvatar,
    resendEmail,
}