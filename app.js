var http = require('http');
var ecstatic = require('ecstatic');
var port = process.env.PORT || 5000;

http.createServer(
    ecstatic({ root: __dirname + '/public' })
).listen(port);

console.log('Listening on', port);
