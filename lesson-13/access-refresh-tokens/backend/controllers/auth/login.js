const bcrypt = require("bcryptjs")

const {User} = require("../../models/user")

const {HttpError, createTokens} = require("../../helpers")

const login = async(req, res) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid"); // throw HttpError(401, "Email invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid"); // throw HttpError(401, "Password invalid");
    }

    const tokens = createTokens(user._id);
    
    await User.findByIdAndUpdate(user._id, {...tokens})
    
    res.json(tokens)
}

module.exports = login;