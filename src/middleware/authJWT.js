
const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const constant = require("../global/globalConf")
const path = require('path')

const app = express();
app.use(express.static('build'));
dotenv.config();
const auth = jwt;

let port = process.env.port || constant.SERV_PORT;
app.get('*', (req, rsp)=>{
    rsp.sendFile(path.resolve(__dirname, '../../build/index.html'));
})
app.listen(port, ()=>{
    console.log(`Server is up and running on ${port}`);
})

