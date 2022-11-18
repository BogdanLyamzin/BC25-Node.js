const {Book} = require("../../models/book")

const { HttpError } = require("../../helpers")

const getById = async (req, res) => {
    const { id } = req.params;
    // const result = await Book.findOne({_id: id})
    const result = await Book.findById(id)
    if (!result) {
        throw HttpError(404);
    }

    res.json(result);
}

module.exports = getById;