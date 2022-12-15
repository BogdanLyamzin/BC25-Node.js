const jwt = require("jsonwebtoken")

const {User} = require("../../models/user")

const {HttpError, createTokens} = require("../../helpers")

const {REFRESH_SECRET_KEY} = process.env;

const refresh = async(req, res) => {
    const {refreshToken} = req.body;
    try {
        const {id} = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
        const user = await User.findById(id);
        if(user.refreshToken !== refreshToken) {
            throw new Error("Forbidden");
        }

        const tokens = createTokens(user._id);
    
        await User.findByIdAndUpdate(user._id, {...tokens})
        
        res.json(tokens)
    }
    catch(error) {
        throw HttpError(403, error.message);
    }
}

module.exports = refresh;