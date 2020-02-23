const http = require('http');


const test = {
    cols: 
        ['date',
        'location',
        //'Cigarette_Butts',
        //'Food_Wrappers',
        'Plastic_Take_Out_Containers',
        'Foam_Take_Out_Containers']
}

let queryString = JSON.stringify(test);

let options = {
    host: 'localhost',
    port: 8000,
    path: '/byCols',
    method: 'GET',
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