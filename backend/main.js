const Express = require('express');
const AppError = require('./errors');
const Database = require('./database');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');



const app = Express();
app.use(Express.json());
app.use(cors());
app.options('*', cors());
const database = Database.create(null);
app.use(bodyParser.urlencoded({
	extended: true
  }));
app.use(bodyParser.json());



passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  //bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
	// Store hash in your password DB.
//});



function authenticateInput(input) {
	return true;
}

app.post('/add', async (req, res) => {
	console.log(req.body)
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

app.post('/login', async (req, res) => {
	res.status(200).send(req.body.username + "   " + req.body.password);
	
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




app.listen(8000);
