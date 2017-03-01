var express  = require('express');
var app  = express();
var spawn = require('child_process').spawn;
var parser = require('xml2json');

const ls = spawn('sh', ['./modules/test.sh']);
var output;

app.use('/', express.static('public'));

app.get('/dsp/:labid', function(req, res){
        var labinfo = spawn('sh', ['./modules/labinfo.sh', req.params.labid]);
	var concisevmInfo = spawn('./modules/labinfo-list.sh', [req.params.labid]);
        var jsonData, tempData;
      labinfo.stdout.on('data', function(data){
                jsonData = data.toString();
		res.send(jsonData);
	});
});

app.get('/conciseinfo/:labid', function(req,res){
	var concisevmInfo = spawn('./modules/labinfo-list.sh', [req.params.labid]);
	var tempData;
        concisevmInfo.stdout.on('data', function(data){
                tempData = data.toString();
                console.log(tempData);
                res.send(tempData);
        });

});


app.get('/dsp/:labid/:vm', function(req, res){
        var vmcapacity = spawn('sh', ['./modules/vmcapacity.sh', req.params.labid, req.params.vm]);
        var labvminfo = spawn('sh', ['./modules/labinfoVM.sh', req.params.labid, req.params.vm]);

	var jsonData, tempOutput, capacity;
        labvminfo.stdout.on('data', function(data){
                tempOutput = data.toString();
        	jsonData = parser.toJson(tempOutput);
	//		jsonData.domain.id = "10GB"
		//console.log(jsonData);
        	res.send(jsonData);
                })
//	vmcapacity.stdout.on('data', function(data){
//		capacity = data.toString();
//		res.send(capacity);
//	})
});


var server = app.listen(8089, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("The server is up and listening at %s and port %s", host, port);
});

