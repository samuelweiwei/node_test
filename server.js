const express = require("express");
const dotenv = require("dotenv");
const constant = require("./src/backend/global/globalConf")
const path = require("path")
const app = express();
const loadedGraph = require("./src/backend/graph/loadGraph");

dotenv.config();
//server starter
let port = process.env.port || constant.SERV_PORT;
app.listen(port, ()=>{
    console.log(`Server is up and running on ${port}`);
})
//router starter
app.use(express.static('build'));

app.get('/', (req, rsp, next)=>{
    rsp.sendFile(path.resolve(__dirname, './build/index.html'));
})

app.get('/routeswithmaxstops', (req, res, next)=>{
    const src = req.query.src;
    const dest = req.query.dest;
    const stopsStr = req.query.stops;
    if (!src) {
        console.warn(`No source start place: ${src}`);
        res.status(400).send({result: 'failed', errors:`No source start place: ${src}`});
        return;
    }
    if (!dest) {
        console.warn(`No destination place: ${dest}`);
        res.status(400).send({result: 'failed', errors:`No destination place: ${dest}`});
        return;
    }
    if (!stopsStr) {
        console.warn(`No stops number: ${stopsStr}`);
        res.status(400).send({result: 'failed', errors:`No stops number: ${stopsStr}`});
        return;
    }
    if (isNaN(stopsStr.trim())){
        console.warn(`Stops number is not number: ${stopsStr}`);
        res.status(400).send({result: 'failed', errors:`Stops number is not number: ${stopsStr}`});
        return;
    }
    const stops = parseInt(stopsStr.trim());
    const routes = loadedGraph.findRoutesWithMaxStops(src, dest, stops);
    res.status(200).send({result: 'succeeded', msg: routes});
    // console.dir(routes);
})
const awtmiddleware = (req, res, next)=>{
    console.log("jwt middle ware");
    next();
}
app.get('/routeswithexactstops', awtmiddleware, (req, res)=>{
    const src = req.query.src;
    const dest = req.query.dest;
    const stopsStr = req.query.stops;
    if (!src) {
        console.warn(`No source start place: ${src}`);
        res.status(400).send({result: 'failed', errors:`No source start place: ${src}`});
        return;
    }
    if (!dest) {
        console.warn(`No destination place: ${dest}`);
        res.status(400).send({result: 'failed', errors:`No destination place: ${dest}`});
        return;
    }
    if (!stopsStr) {
        console.warn(`No stops number: ${stopsStr}`);
        res.status(400).send({result: 'failed', errors:`No stops number: ${stopsStr}`});
        return;
    }
    if (isNaN(stopsStr.trim())){
        console.warn(`Stops number is not number: ${stopsStr}`);
        res.status(400).send({result: 'failed', errors:`Stops number is not number: ${stopsStr}`});
        return;
    }
    const stops = parseInt(stopsStr.trim());
    const routes = loadedGraph.findRoutesWithExactStops(src, dest, stops);
    // console.dir(routes);
    res.status(200).send({result: 'succeeded', msg: routes});
})

app.get("/routeswithmaxdist", (req, res, next)=>{
    const src = req.query.src;
    const dest = req.query.dest;
    const distStr = req.query.dist;
    if (!src) {
        console.warn(`No source start place: ${src}`);
        res.status(400).send({result: 'failed', errors:`No source start place: ${src}`});
        return;
    }
    if (!dest) {
        console.warn(`No destination place: ${dest}`);
        res.status(400).send({result: 'failed', errors:`No destination place: ${dest}`});
        return;
    }
    if (!distStr) {
        console.warn(`No distance number: ${distStr}`);
        res.status(400).send({result: 'failed', errors:`No distance number: ${distStr}`});
        return;
    }
    if (isNaN(distStr.trim())){
        console.warn(`Distance number is not number: ${distStr}`);
        res.status(400).send({result: 'failed', errors:`Distance number is not number: ${distStr}`});
        return;
    }
    const dist = parseInt(distStr.trim());
    const routes = loadedGraph.findRouteWithMaxDistances(src, dest, dist);
    res.status(200).send({result: 'succeeded', msg: routes});
})

app.get('/shortestpath', (req, res, next)=>{
    const src = req.query.src;
    const dest = req.query.dest;
    if (!src) {
        console.warn(`No source start place: ${src}`);
        res.status(400).send({result: 'failed', errors:`No source start place: ${src}`});
        return;
    }
    if (!dest) {
        console.warn(`No destination place: ${dest}`);
        res.status(400).send({result: 'failed', errors:`No destination place: ${dest}`});
        return;
    }
    const routes = loadedGraph.shortestPathDijkstra(src, dest);
    res.status(200).send({result: 'succeeded', msg: routes});
    // console.dir(routes);
})


app.post("/distances", (req, res, next)=>{
    const paths = req.body
    console.log(paths);
    const distance = loadedGraph.calculatePathDistance(paths);
    res.status(200).send({result: 'succeeded', msg: {distance: distance}});
})


app.use((req, res, next) => {
    console.log('Page not found on server')
}, (req,res, next)=>{
    const msg = 'Page Not Found';
    msg.status = 404;
    next(msg);
});

