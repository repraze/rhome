const express = require('express');
const app = express();
const port = 3000;

const api = require('./api');

// serve static content with bundle
app.use(express.static('public'));

// serve api
app.use('/api', api);

// serve webapp
app.get('/*', (req, res)=>res.sendFile(__dirname+'/static/index.html'));

// start the server
app.listen(port, ()=>console.log(`Example app listening on port ${port}!`));
