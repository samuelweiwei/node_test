const express = require('express');
var https = require('https')
var http = require('http')
const dotenv = require('dotenv');
const path = require('path');
const authJWT = require('./backend/middleware/authJWT');
const graphCtrl = require('./backend/controller/graphCtrl');
const jwtCtrl = require('./backend/controller/authJWTCtrl')
const commonCtrl = require('./backend/controller/commonCtrl');
const logger = require('./backend/global/logger')
var fs = require('fs');

//Initialization
const app = express();
dotenv.config();
//server starter
const httpPort = process.env.HTTPS_PORT || 5000;
const httpsPort = process.env.HTTPS_PORT || 5443;
const httpEnabled = process.env.HTTP_ENABLED || 'disabled';
var options = {
    key: fs.readFileSync('./rootCA.key'),
    cert: fs.readFileSync('./rootCA.pem')
  };
// app.listen(port, ()=>{
//     console.log(`Server is up and running on ${port}`);
//     logger.info(`Starting server........`);
// })
if (httpEnabled.toLowerCase() === 'enabled') {
    console.log('Http server started............');
    http.createServer(app).listen(httpPort);
}
console.log('Https server started........');
https.createServer(options, app).listen(httpsPort);
//router starter, integrate react, not separate controller
app.use(express.static('build'));
app.get('/', (req, rsp, next)=>{
    rsp.sendFile(path.resolve(__dirname, './build/index.html'));
})

//seperate controllers
app.get('/routeswithmaxstops', authJWT.verifyToken, graphCtrl.routesWithMaxStops);

app.get('/routeswithfixedstops', authJWT.verifyToken, graphCtrl.routesWithFixedStops);

app.get('/routeswithmaxdist', authJWT.verifyToken, graphCtrl.routesWithMaxDist);

app.get('/shortestpath', authJWT.verifyToken, graphCtrl.shortestPath);

app.post('/distances', authJWT.verifyToken, graphCtrl.distances);

app.get('/generateToken', authJWT.generateToken, jwtCtrl.generateToken);

app.use(commonCtrl.pageNotFound);