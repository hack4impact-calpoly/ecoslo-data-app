const http = require('http');


const test = {
    cols: 
        ['Plastic_Take_Out_Containers',
        'Foam_Take_Out_Containers'],
    vals: [7, 8],
    date: '2020-01-01',
    location: 'Avila'
}

let queryString = JSON.stringify(test);

let options = {
    host: 'localhost',
    port: 8000,
    path: '/update',
    method: 'PUT',
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

console.log("qs: ", queryString);
req.write(queryString);