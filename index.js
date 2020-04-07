const http = require('http');
const WebSocketServer = require('websocket').server;
let connection = null;

const httpserver = http.createServer((req, res) => {
    console.log('we have received a request!');
});
const websocket = new WebSocketServer({
    'httpServer': httpserver
});

websocket.on('request', request => {

    connection = request.accept(null, request.origin);
    connection.on('open', () => console.log('Opened'));
    connection.on('close', () => console.log('Closed!'));
    connection.on('message', message => {
        console.log(`Received message: ${message.utf8Data}`);
    });
    sendEvery5Seconds();
});

httpserver.listen(8080, () => console.log('My sever is listening on port 8080'));

function sendEvery5Seconds() {
    connection.send(`Message ${Math.random()}`);
    setTimeout(sendEvery5Seconds, 5000);
}
