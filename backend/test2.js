const http = require('http');


const test = {
    item: {
        test1: '1',
        test2: '2',
        test3: '3',
        test4: '4',
        test5: '5'
    }
};

let queryString = JSON.stringify(test);

let options = {
    host: 'localhost',
    port: 8000,
    path: '/add',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': queryString.length
    }
};


let req = http.request(options, (res) => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
});

req.write(queryString);