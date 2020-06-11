const Express = require('express');
const AppError = require('./errors');
const Database = require('./database');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');

<<<<<<< HEAD
const path = require('path');

const app = Express();

const usingProduction = process.env.NODE_ENV === 'production';
const whiteListedOrigins = ['http://localhost:3000', 'https://ecoslo-data-app.herokuapp.com'];
const corsOptions = {
	origin : (origin, callback) => {
		if (whiteListedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			console.log(new Error(`${origin} is not whitelisted for CORS`));
		}
	},
	optionsSuccessStatus : 200,
	credentials : true,
};

app.use(cors(corsOptions));
app.options(cors(corsOptions));
=======

>>>>>>> parent of ed99211... sessions for login

const app = Express();
app.use(Express.json());
<<<<<<< HEAD
// app.use(cors());
// app.options('*', cors());
const database = Database.create(null);


app.use(Express.static(path.resolve(__dirname, '../ecoslo-frontend/build')));

=======
app.use(cors());
app.options('*', cors());
const database = Database.create(null);
>>>>>>> parent of ed99211... sessions for login
app.use(bodyParser.urlencoded({
	extended: true
  }));
app.use(bodyParser.json());
<<<<<<< HEAD
app.use(session({ 
	secret: usingProduction ? process.env.SESSION_SECRET : 'keyboard cat',
	resave : false,
	saveUninitialized: false,
	cookie: { secure: usingProduction, maxAge : 7200000, httpOnly : true }
}));

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log("id: ", id);
	done(null, new User.User(null, null, id));
});


if (!usingProduction && process.env.USE_TEMP_DB) {
	console.log("Using temp database (temp_db.js)");
	database = tempDB;
}
Auth.initializeLocalStrat(database);



// app.get("/", async (req, res) => { res.status(200).send("Server running"); });
=======


>>>>>>> parent of ed99211... sessions for login

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

  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
	// Store hash in your password DB.
});



function authenticateInput(input) {
	return true;
}

<<<<<<< HEAD


app.post('/add', Auth.isAuthenticated, async (req, res) => {
	try {
		let result = await database.add(req.body.item);
		res.status(200).json({})
=======
app.post('/add', async (req, res) => {
	console.log(req.body)
	if (!authenticateInput(req.body.item)) {
		res.status(400).send(AppError.stringError(AppError.badAuth));
		return;
	}
	try {
		await database.add(req.body.item);
>>>>>>> parent of ed99211... sessions for login
	} catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	res.status(200).send();
})

app.post('/login', async (req, res) => {
	res.status(200).send(req.body.username + "   " + req.body.password);
	
}) 

<<<<<<< HEAD
app.post('/login', async (req, res) => {
	res.status(200).send(req.body.username + "   " + req.body.password);
	
}) 

app.post('/altTable', Auth.isAuthenticated, async (req, res) => {
=======
app.post('/altTable', async (req, res) =>{
>>>>>>> parent of ed99211... sessions for login
	try {
		await database.alterTable(req);
	} catch (err) {
		res.status(400).send(AppError.stringError(err.message));
		return;
	}
	res.status(200).json({});
});

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

<<<<<<< HEAD
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../ecoslo-frontend/build', 'index.html'));
  });



app.listen(process.env.PORT || 8000);
=======



app.listen(8000);
>>>>>>> parent of ed99211... sessions for login
