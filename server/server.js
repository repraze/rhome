const mongoose = require('mongoose');
const express = require('express');
const PORT = 3000;

const api = require('./api');

// connect debug
async function connectDatabase(){
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    return await mongoose.connect('mongodb://127.0.0.1/rhome', {useNewUrlParser: true});
}

async function startServer(port){
    const app = express();

    // serve static content with bundle
    app.use(express.static('public'));

    // serve api
    app.use('/api', api);

    // serve webapp
    app.get('/*', (req, res)=>res.sendFile(__dirname+'/static/index.html'));

    // start the server
    const server = await new Promise(function(res, rej){
        const server = app.listen(port, ()=>res(server));
    });

    return server;
}

async function start(){
    const connection = await connectDatabase();
    console.log("DB connected");
    const server = await startServer(PORT);
    console.log(`App running on ${PORT}`);
}

start();
