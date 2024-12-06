
const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const constant = require("../global/globalConf")
const path = require('path')

const app = express();
app.use(express.static('build'));
dotenv.config();
const auth = jwt;

