const jwt = require("jsonwebtoken")

const {HttpError} = require("../helpers")

const {User} = require("../models/user")

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next)=> {
    const {authorization} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") {
        next(HttpError(401))
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user) {
            next(HttpError(401, "User not found"))
        }
        if(!user.token) {
            next(HttpError(401))
        }
        req.user = user;
        next()
    }
    catch(error) {
        next(HttpError(401, error.message))
    }
}

module.exports = authenticate;