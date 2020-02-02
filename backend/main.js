const Express = require('express');
const AppError = require('./errors');
const {Pool, Client} = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database
})

const client = new Client();

const app = Express();
app.use(Express.json());
client.connect();


app.get('/', (req, res) => {
	res.send("Hello world");
})

app.post('/add', (req, res) => {
	/* TODO: authentication */
	if (!authenticateInput(req.body.item)) {
		res.status(400).send(AppError.badData);
		return;
	}
	
})

app.listen(8000);
