const Express = require('express');
const AppError = require('./errors');
const Database = require('./database');

const app = Express();
app.use(Express.json());
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

app.listen(8000);
