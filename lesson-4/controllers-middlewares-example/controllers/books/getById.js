const books = require("../../models/books")

const { HttpError } = require("../../helpers")

const getById = async (req, res, next) => {
    const { id } = req.params;
    const result = await books.getById(id);
    if (!result) {
        throw HttpError(404);
    }

    res.json(result);
}

module.exports = getById;