var http = require('http');
var formurl = require('url');

http.createServer(function(req,res) {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h1>Query Results</h1>');

    // Parse url data to obtain user-inputted company name or stockticker value
    var qobj = formurl.parse(req.url, true).query;
    var name = qobj.companyName;
    var stockticker = qobj.stockticker;
    var enteredCompany = true;

    // If user did not provide company name, set bool enteredCompany = false
    if (name == "") {
        enteredCompany = false;
    }

    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb+srv://elizabethhom1:vApsZzAxcQKwaQr1@cluster0.6krme.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
    	if (err) { return console.log(err); }

        // Connect to "companies" DB and collection on MongoDB
    	var dbo = db.db("companies");
    	var coll = dbo.collection('companies');
        var query = {};

        // If company name was provided or not, set query value accordingly
        if (enteredCompany == true) {
            query['name'] = name;
        } else {
            query['stockticker'] = stockticker;
        }

        // Do query based on company name or stockticker & print results to page
    	coll.find(query).toArray(function(err, items) {
    		if (err) {
    			console.log("error: " + err);
    		} else {
                for (var i = 0; i < items.length; i++) {
                    res.write("<h3>Company " + (i + 1) + "</h3>");
                    res.write("Company Name: " + items[i].name + "<br />");
                    res.write("Company Stockticker: " + items[i].stockticker + "<br />");
                }
    		}
    	})
    	db.close();
    })
}).listen(8080);
