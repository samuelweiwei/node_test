const express = require("express");
const dotenv = require("dotenv");
const constant = require("./src/global/globalConf")
const path = require('path')
const app = express();

dotenv.config();
//server starter
let port = process.env.port || constant.SERV_PORT;
app.listen(port, ()=>{
    console.log(`Server is up and running on ${port}`);
})
//router starter
app.use(express.static('build'));
app.get('*', (req, rsp)=>{
    rsp.sendFile(path.resolve(__dirname, './build/index.html'));
})
