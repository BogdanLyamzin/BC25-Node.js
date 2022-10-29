const fs = require("fs/promises");

const fileOperation = async({filepath, action, data})=> {
    switch(action){
        case "read":
            const text = await fs.readFile(filepath, "utf-8");
            console.log(text);
            // const result = await fs.readFile(filepath);
            // const text = result.toString();
            // console.log(text);
            break;
        case "add":
            await fs.appendFile(filepath, data);
            break;
        case "replace":
            await fs.writeFile(filepath, data);
            break;
        default:
            console.log("Unknown action");
    }
}

const filepath = "./files/file.txt";

// fileOperation({action: "read", filepath});
// fileOperation({action: "add", filepath, data: "\nИдешь к женщине - возьми с собой плеть"});
// fileOperation({action: "replace", filepath, data: "Кодекс Ванталы"});

// fileOperation({action: "add", filepath: "./files/file2.txt", data: "\nИдешь к женщине - возьми с собой плеть"});
// fileOperation({action: "replace", filepath: "./files/file3.txt", data: "Кодекс Ванталы"});

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.messsage))

// fs.readFile("./files/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// });