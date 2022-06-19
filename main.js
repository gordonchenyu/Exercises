 // Yuhong Chen
 //5 May 2022
 //The purpose of program is for gaming on real engine

const express = require("express");
const bodyParser = require("body-parser");
const generator = require("generate-password");
const app = express();
const fs = require("fs");

app.use(express.static("public"));
app.use(bodyParser.json());

//get the user infomation from accounts.txt file
//IIFE
let users = [];
(() => {  
    try
    {
        let rawData = fs.readFileSync("./accounts.txt", "utf-8");
        let data = rawData.split("\r\n");
        for (let i=0; i < data.length - 1; i++)
        {
            let name = data[i].split(" ")[0];
            let code = data[i].split(" ")[1];
            users.push({username: `${name}`, password: `${code}`});
        }
    }
    catch (err) {console.log(err)};
})();


//validate login details
app.post("/login", (request, response) => {
    let loginInfo = JSON.stringify(request.body);
    let validation;
    if (JSON.stringify(users).includes(loginInfo))
    {
        validation = "Login successfull!";
    }
    else
    {
        validation = "Invalid username or password.\nPlease try again or get registered." + 
            "\nUsername and password are case sensitive.";
    }
    response.status(200).json({result: validation});
});

//create new user account
app.post("/register", (request, response) => {
    let registerInfo = request.body;
    let registrable = true;
    let registerResult;   
    for (let i = 0; i < users.length; i++)
    {
        if (registerInfo.username == users[i].username)
        {
            registerResult = "Username has been used.\nPlease choose another one.";
            registrable = false;
            break;
        };
        registerResult = `${registerInfo.username} has been registered successfully.`;
    }
    if (registrable)
    {
        fs.writeFileSync("./accounts.txt", `${registerInfo.username} ${registerInfo.password}\r\n`, {flag: "a+"});
        users.push(registerInfo);
    };
    response.status(200).json({result: registerResult});
});

//generate password and return to the client
app.post("/generate-password", (request, response) => {
    let inclusion = request.body;
    let passwords = generator.generate(inclusion);
    response.status(200).json({password: passwords});
});

//return the user infomation from accounts.txt file to client
app.get("/users", (request, response) => {
    response.status(200).json(users);
});

//disconnect the server
app.get("/exit", (request, response) => {
    
    response.status(200).json({message: "Server will be disconnected in 2 seconds."});
    setTimeout(() => {
        console.log("Server disconnected.");
        process.exit();  
    }, 2000)
});

app.listen(3000, () => {console.log("Server started on port 3000")});