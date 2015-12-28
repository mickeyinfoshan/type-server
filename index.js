var net = require('net');
var readlineSync = require('readline-sync');
var argv = require('minimist')(process.argv.slice(2));

var HOST = argv.host || argv.h || '127.0.0.1';
var PORT = argv.port || argv.p || 6969;

net.createServer(function(sock) {

    // 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('CONNECTED: ' +
        sock.remoteAddress + ':' + sock.remotePort);

    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        sock.write("HTTP/1.1 500 OK\n");
        sock.write("Connection: close\n");
        sock.write("Content-type: text/plain\n\n");
        var response = readlineSync.question('Please enter your response: ');
        sock.write(response);
        sock.end();
    });

    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function(data) {
        console.log('CLOSED: ' +
            sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
