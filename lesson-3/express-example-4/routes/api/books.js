const express = require("express");

const books = require("../../data/books")

const router = express.Router()

router.get("/", (req, res)=> {
    res.json(books)
})

router.get("/:id", (req, res)=> {
    res.json({})
})

router.post("/", (req, res)=> {
    res.status(201).json({})
})

router.put("/:id", (req, res)=> {
    res.json({})
})

router.delete("/:id", (req, res)=> {
    res.json({})
})

module.exports = router;