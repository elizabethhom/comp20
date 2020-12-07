var readline = require('readline');
var fs = require('fs');
var http = require('http');
var companies = [];
var stockticker = [];

// Read in line by line
var myFile = readline.createInterface({
  input: fs.createReadStream('companies-1.csv')
});

myFile.on('line', function (line) {
	// Split CSV contents by comma & push values into corresponding array
	var companyData = line.split(",");
	companies.push(companyData[0]);
	stockticker.push(companyData[1]);
});

http.createServer(function(req,res) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h1>Company StockTicker Collection</h1>');

    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb+srv://elizabethhom1:vApsZzAxcQKwaQr1@cluster0.6krme.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
    	if (err) { return console.log(err); }

    	// Connect to "companies" DB and collection on MongoDB
    	var dbo = db.db("companies");
    	var coll = dbo.collection('companies');

    	// Insert each entry into MongoDB DB
    	for (var i = 0; i < companies.length; i++) {
    		var entry = {};
    		entry['name'] = companies[i];
    		entry['stockticker'] = stockticker[i];

    		coll.insertOne(entry, function(err, res) {
    			if (err) { throw err; }
    		});
    	}
    	db.close();
    })
}).listen(8080);