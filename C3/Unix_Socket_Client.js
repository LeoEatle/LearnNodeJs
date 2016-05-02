// Unix_Socket_Client.js


var http = require('http');

var options = {
	method: 'GET',
	socketPath: '/tmp/node-server-soock',
	path:'/?file= main.txt'

};

var req = http.request(options, (res)=>{
	console.log('STATUS: '+res.statusCode);;
	console.log('HEADERS: ' + JSON.stringify(res.headers));
	res.setEncooding('utf-8');
	res.on('data', (chunk)=>{
		console.log('chunk o\' data: ' + chunk);
		});
	});



//write data to request body
req.write('data\n');
req.write('data\n');
req.end();
