const jwt = require("jsonwebtoken");
require("dotenv").config();

const {SECRET_KEY} = process.env;

const payload = {
    id: "637cf304fb6f9574435a541d"
}

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
// console.log(token);

const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2NmMzA0ZmI2Zjk1NzQ0MzVhNTQxZCIsImlhdCI6MTY2OTEzNTE1MiwiZXhwIjoxNjY5MjE3OTUyfQ.kYMx4yukhxdQrs7bY6JvzZ1pYiqYIYU1jKUVwKNtNkq"
    const {id} = jwt.verify(token, SECRET_KEY);
    console.log(id);
    const result = jwt.verify(invalidToken, SECRET_KEY)
}
catch(error) {
    console.log(error.message)
}