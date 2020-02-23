const http = require('http');


const test = {
    item: {
        date: '2020-01-01',
        location: 'Avila',
        Cigarette_Butts: 3,
        Food_Wrappers: 6,
        Plastic_Take_Out_Containers: 9,
        Foam_Take_Out_Containers: 7
    }
};

let queryString = JSON.stringify(test);

let options = {
    host: 'localhost',
    port: 8000,
    path: '/byDate',
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

req.write(queryString);