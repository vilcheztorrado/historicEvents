var path = require('path');
var express = require('express');
const app = express();

app.use(express.static(__dirname+'/dist/historic-events'));
app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/historic-events/index.html')); 
});

app.listen(process.env.PORT || 80);