const Express = require('express');
const AppError = require('./errors');
const Database = require('./database');
const cors = require('cors');
const path = require('path');

const app = Express();
app.use(Express.json());
app.use(cors());
app.options('*', cors());
const database = Database.create(null);


function authenticateInput(input) {
	return true;
}

app.use(Express.static(path.resolve(__dirname, '../ecoslo-frontend/build')));


app.post('/add', async (req, res) => {
	if (!authenticateInput(req.body.item)) {
		res.status(400).send(AppError.stringError(AppError.badAuth));
		return;
	}
	try {
		let result = await database.add(req.body.item);
		res.status(200).json({})
	} catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	//res.status(200).send();
})

app.post('/altTable', async (req, res) =>{
	try {
		await database.alterTable(req);
	} catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	//res.status(200).send();
	res.status(200).json({});
})

app.get('/locations', async (req, res) => {
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
})

app.get('/columns', async (req, res) => {
	try{
		let r = await database.getCols();
		res.status(200).json({
			r
		});
	}
	catch (err) {	
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
})


app.get('/byCols', async (req, res) => {
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
			rows : result.rows
		});
	}
	catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
})

app.get('/sumPerCol', async (req, res) => {
	try{
		let queryParams = req.query;
		if ("cols" in queryParams) {
			queryParams["cols"] = queryParams["cols"].split(",");
		}
		if ("locations" in queryParams) {
			queryParams["locations"] = queryParams["locations"].split(",");
		}
		if ("groupBy" in queryParams) {
			queryParams["groupBy"] = queryParams["groupBy"].split(",");
		}
		let result = await database.sumPerCol(queryParams);
		res.status(200).json({
			rows : result.rows
		});
	}
	catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
})




app.put('/update', async (req, res) => {
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

app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../ecoslo-frontend/build', 'index.html'));
  });



app.listen(process.env.PORT || 8000)
