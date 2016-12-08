var express  = require('express');
var app  = express();
var spawn = require('child_process').spawn;
var parser = require('xml2json');

const ls = spawn('sh', ['./modules/test.sh']);
var output;

app.use('/', express.static('public'));

app.get('/dsp/:labid', function(req, res){
        var labinfo = spawn('sh', ['./modules/labinfo.sh', req.params.labid]);
        var jsonData;
        labinfo.stdout.on('data', function(data){
                jsonData = data.toString();
		res.send(jsonData);
        });
});

app.get('/dsp/:labid/:vm', function(req, res){
        var labvminfo = spawn('sh', ['./modules/labinfoVM.sh', req.params.labid, req.params.vm]);
	var jsonData;
        labvminfo.stdout.on('data', function(data){
                jsonData = data.toString();
		jsonData = parser.toJson(jsonData);
	        res.send(jsonData);

        })
});


var server = app.listen(8089, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("The server is up and listening at %s and port %s", host, port);
});

