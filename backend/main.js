const Express = require('express');
const AppError = require('./errors');
const Database = require('./database');
const cors = require('cors');

const app = Express();
app.use(Express.json());
app.use(cors());
app.options('*', cors());
const database = Database.create(null);

function authenticateInput(input) {
	return true;
}

app.post('/add', async (req, res) => {
	if (!authenticateInput(req.body.item)) {
		res.status(400).send(AppError.stringError(AppError.badAuth));
		return;
	}
	try {
		await database.add(req.body.item);
	} catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	res.status(200).send();
})

app.get('/locations', async (req, res) => {
	console.log("get request locations")
	try{
		await database.getLocations();
	}
	catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	res.status(200).send();
})

app.get('/columns', async (req, res) => {
	try{
		await database.getCols();
	}
	catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	res.status(200).send();
})

app.get('/byDate', async (req, res) => {
	console.log("get request locations")
	try{
		await database.getAllByDate();
	}
	catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	res.status(200).send();
})


app.get('/byCols', async (req, res) => {
	console.log("getting by cols");
	try{
		await database.getByCol(req);
	}
	catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	res.status(200).send();
})




app.listen(8000);
