const books = require("../../models/books")

const { HttpError } = require("../../helpers")

const removeById = async (req, res, next) => {
    const { id } = req.params;
    const result = await books.removeById(id);
    if (!result) {
        throw HttpError(404);
    }
    res.json({
        message: "Book deleted"
    })
}

module.exports = removeById;