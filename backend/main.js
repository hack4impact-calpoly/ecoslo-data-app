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


// const client = new Client({
// 	connectionString: process.env.DATABASE_URL,
// 	ssl: true,
// });
// client.connect();

function authenticateInput(input) {
	return true;
}

//app.use(Express.static(path.join(__dirname, '../ecoslo-frontend/public')));

// app.get('*', (req,res) =>{
// 	console.log("am i here or no...")
//     res.sendFile(path.join(__dirname, '../ecoslo-frontend/public/index.html'));
// });

// app.get('/', function(req, res){
// 	console.log("IM HEREEEEEEEE")
// 	//res.redirect('/todo');
//  });
app.use(Express.static(path.resolve(__dirname, '../ecoslo-frontend/build')));



  app.get('/db', async (req, res) => {
    try {
	  let result = await database.testing();
	  res.render('pages/db', result );
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

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

app.post('/altTable', async (req, res) =>{
	try {
		await database.alterTable(req);
	} catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	res.status(200).send();
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
//app.listen(8000);
