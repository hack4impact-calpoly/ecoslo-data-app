const http = require('http');


const test = {
    item: {
        date: '2020-01-01',
        location: 'Avila2',
        Cigarette_Butts: 4,
        Food_Wrappers: 4,
        Plastic_Take_Out_Containers: 4,
        Foam_Take_Out_Containers: 4,
        Plastic_Bottle_Caps: 1,
        Metal_Bottle_Caps: 2,
        Plastic_Lids: 3,
        Straws_And_Stirrers: 4,
        Forks_Knives_And_Spoons: 5,
        Plastic_Beverage_Bottles: 6,
        Glass_Beverage_Bottles: 7,
        Beverage_Cans: 8,
        Plastic_Grocery_Bags: 9,
        Other_Plastic_Bags: 10,
        Paper_Bags: 11,
        Paper_Cups_And_Plates: 12,
        Plastic_Cups_And_Plates: 13,
        Foam_Cups_And_Plates: 14,
        Fishing_Buoys_Pots_And_Traps: 15,
        Fishing_Net_And_Pieces: 16,
        Fishing_Line: 17,
        Rope: 18,
        Six_Pack_Holders: 19,
        Other_Plastic_Or_Foam_Packaging: 20,
        Other_Plastic_Bottles: 21,
        Strapping_Bands: 22,
        Tobacco_Packaging_Or_Wrap: 23,
        Appliances: 24,
        Balloons: 25,
        Cigar_Tips: 26,
        Cigarette_Lighters: 27,
        Construction_Materials: 28,
        Fireworks: 29,
        Tires: 30,
        Condoms: 31,
        Diapers: 32,
        Syringes: 33,
        Tampons: 34,
        Foam_Pieces: 35,
        Glass_Pieces: 36,
        Plastic_Pieces: 37
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

let options2 ={

}


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