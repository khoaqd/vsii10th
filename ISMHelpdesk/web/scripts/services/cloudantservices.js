/**
 * Server for the my cloudant app
 */

var express = require('express');
var app = express();
var http = require('http');

var host = "localhost";
var port = 3000;
var cloudant = {
		url : "https://db2a7c36-166d-417d-950a-57344687c8f8-bluemix:e88553ca76ee279bbff2afb1c307a266b1aeb8a2561616b7f4b9a4ce3209f649@db2a7c36-166d-417d-950a-57344687c8f8-bluemix.cloudant.com"		 		 
};


if (process.env.hasOwnProperty("VCAP_SERVICES")) {
  // Running on Bluemix. Parse out the port and host that we've been assigned.
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var host = process.env.VCAP_APP_HOST; 
  var port = process.env.VCAP_APP_PORT;

  console.log('VCAP_SERVICES: %s', process.env.VCAP_SERVICES);    

  // Also parse out Cloudant settings.
  cloudant = env['cloudantNoSQLDB'][0].credentials;  
}

var nano = require('nano')(cloudant.url);
var db = nano.db.use('mydb');
//var db = nano.db.use('guess_the_word_hiscores');

/**
 * get all employees from documents in mydb
 */

app.get('/employess', function(req, res){	
	db.get("7e15e98d615ab0c671c4b6d40e2a7856",{ revs_info: true },function(err, body){
		if(!err){
			console.log(body);
			var employees = [];
		      body.rows.forEach(function(doc) {
		    	  employees.push(doc.value);		      
		      });
		      res.send(JSON.stringify(employees));
		}
	    
	});
});

app.get('/users', function(req, res){	
	db.get("84cd9c861940df2a4709bf18462ca76b",{ revs_info: true },function(err, body){
		if(!err){
			console.log(body);
			var users = [];
		      body.rows.forEach(function(doc) {
		    	  users.push(doc.value);		      
		      });
		      res.send(JSON.stringify(users));
		}
	    
	});
});


/**
 * Lookup the word in the wordnik online dictionary and return a description for it.
 * @param word {String} Word to lookup description for
 * @param cb_description {function} Callback with the description as argument. 
 * If the word was not found in the dictionary the description is empty.
 */
/*function wordLookup(word, cb_description) {
  http.request(
      {
	host: "api.wordnik.com",
	path: "/v4/word.json/" + word + "/definitions?limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
      },	function (res) {
	var str = '';
	res.on('data', function(d) {
	  str += d;
	});
	res.on('end', function() {
	  var wordList = JSON.parse(str);
	  cb_description(wordList.length > 0 ? wordList[0].text : "");
	});
      }).end();
}

app.get('/randomword', function(request, response) {
  http.request(
      {
	host: "api.wordnik.com",
	path: "/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
      }, function (res) {
	var str = '';
	res.on('data', function(d) {
	  str += d;
	});
	res.on('end', function() {
	  var wordObj = JSON.parse(str);
	  wordLookup(wordObj.word, function(descr) {
	    var randomWordObj = { word : wordObj.word, description : descr };
	    response.send(JSON.stringify(randomWordObj));		
	  });								
	});
      }).end();
});

// Set path to Jade template directory
app.set('views', __dirname + '/views');

// Set path to JavaScript files
app.set('js', __dirname + '/js');

// Set path to CSS files
app.set('css', __dirname + '/css');

// Set path to image files
app.set('images', __dirname + '/images');

// Set path to sound files
app.set('sounds', __dirname + '/sounds');

// Set path to static files
app.use(express.static(__dirname + '/public'));

// Bind the root '/' URL to the hiscore page
app.get('/', function(req, res){
  res.render('hiscores.jade', {title: 'Hiscores'});
});

// Bind the '/play' URL to the main game page
app.get('/play', function(req, res){	
  res.render('main.jade', {title: 'Guess the Word'});
});

app.get('/hiscores', function(request, response) {
  db.view('top_scores', 'top_scores_index', function(err, body) {
  if (!err) {
    var scores = [];
      body.rows.forEach(function(doc) {
        scores.push(doc.value);		      
      });
      response.send(JSON.stringify(scores));
	}
  });
});

app.get('/save_score', function(request, response) {
  var name = request.query.name;
  var score = request.query.score;

  var scoreRecord = { 'name': name, 'score' : parseInt(score), 'date': new Date() };
  db.insert(scoreRecord, function(err, body, header) {
    if (!err) {       
      response.send('Successfully added one score to the DB');
    }
  });
});*/

var server = app.listen(port, function() {
  console.log('Server running on port %d on host %s', server.address().port, host);
});

process.on('exit', function() {
  console.log('Server is shutting down!');
});
