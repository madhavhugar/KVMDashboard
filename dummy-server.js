var express  = require('express');
var app  = express();
var spawn = require('child_process').spawn;

const ls = spawn('sh', ['./command.sh']);
var output

ls.stdout.on('data', function(data){
  console.log(data.toString())
  output = data.toString()
});

ls.stderr.on('data', function(data){
  console.log(data);
});

ls.on('close', function(code){
  console.log("child process exited with code %s", code);
});

app.use('/', express.static('public'));

app.get('/dsp/dsplab01', function(req, res){
	res.send(output);
});

var server = app.listen(8089, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("The server is up and listening at %s and port %s", host, port);
});

