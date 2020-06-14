const http = require('http');
// const https = require('https');

const makeRequest = (options, optionalWrite, onEndCallback) => {
    console.log(`\nMaking request at path: ${options.path}`);
    let reqMade = http.request(options, (res) => {
        console.log('STATUS: ' + res.statusCode);
        var body = '';

        res.setEncoding('utf8');
        const cookie = res.headers['set-cookie'];
        // Streams2 API
        res.on('readable', function () {
            var chunk = this.read() || '';
            body += chunk;
        });

        res.on('end', function () {
            console.log("Body: " + body);
            if (onEndCallback) {
                onEndCallback(cookie);
            }
        });
    });
    if (optionalWrite) {
        reqMade.write(optionalWrite);
    }
    reqMade.end();
};

let options = {
    host: 'localhost',
    port: 8000,
    path: '/testAuth',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};

console.log("TRYING testAuth... should fail with 401");
makeRequest(options, null, (cookie) => {
    console.log("TRYING login... should succeed");
    options.path = '/login';
    let queryString = JSON.stringify({
        username : 'temp',
        password : "password"
    });
    makeRequest(options, queryString, (cookie) => {
        options.path = '/add';
        options.headers['Cookie'] = cookie;
        console.log("TRYING add... should succeed");
        makeRequest(options, JSON.stringify({ "item" : "" }), (cookie) => {
            console.log("TRYING locations... should succeed");
            options.method = 'GET';
            options.path = '/locations';
            makeRequest(options, null, null);
        });
    });
});