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
	console.log(req.body);
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
		let result = await database.getLocations();
		res.status(200).json({
			locations : result
		});
		
	}
	catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	//res.status(200).send();
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


app.get('/byCols', async (req, res) => {
	console.log("getting by cols");
	try{
		let queryParams = req.query;
		if ("cols" in queryParams) {
			queryParams["cols"] = queryParams["cols"].split(",");
		}
		if ("locations" in queryParams) {
			queryParams["locations"] = queryParams["locations"].split(",");
		}
		let result = await database.getByCol(queryParams);
		res.status(200).json({
			locations : result
		});
	}
	catch (err) {
		console.log(AppError.stringError(err.message))
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	//res.status(200).send();
})


app.put('/update', async (req, res) => {
	console.log("updating");
	try{
		const result = await database.update(req);
		if (result.rowCount > 0) {
			res.status(200).json({
				message : "Worked"
			});
		} else {
			res.status(500).json({
				error : "Failed on the backend"
			});
		}
	}
	catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
})




app.listen(8000);
