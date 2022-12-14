const books = require("../../models/books")

const { HttpError } = require("../../helpers")

const updateById = async (req, res, next) => {
    const { id } = req.params;
    const result = await books.updateById(id, req.body);
    if (!result) {
        throw HttpError(404);
    }

    res.json(result);
}

module.exports = updateById;