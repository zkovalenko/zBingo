const express = require('express');
const os = require('os');
const _  =require('lodash');
const bodyParser = require('body-parser');

const BINGO_DATA = _.shuffle(_.range(99));

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.static('dist'));


app.get('/api/gameStart', (req, res) => {
	res.send({ username: os.userInfo().username, bingoData: BINGO_DATA })
});

app.get('/api/roll', (req, res) => {
	if ( !req.query.rolledCount ){
		return res.status(500).send("ERR_WRONG_QUERY");
	}

	res.send({ rolledNumber: BINGO_DATA[req.query.rolledCount] });
});

app.post('/api/verifyWinner', (req, res) => {
	console.log("req.body",req.body);

	if ( !req.body.board ){
		return res.status(500).send("ERR_WRONG_QUERY");
	}

	let allFilled = true;
	_.forEach(req.body.board, (row) => {
		if (_.indexOf(row,0)>-1){
		  allFilled = false;
		}
	});


	res.send({ winner:allFilled });
});


app.listen(8080, () => console.log('Listening on port 8080!'));
