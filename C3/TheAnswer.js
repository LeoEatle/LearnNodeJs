// TheAnswer.js
//by LeoEatle

var readline = require('readline');

//create a new interface
var interface = readline.createInterface(process.stdin, process.stdout, null);

//ask a question
interface.question('>>The answer to life, universe and everything.', function(answer)
{
	if (answer == 42)
	{
		console.log('Right.');
	}
	else
	{
		console.log('NO, that should be 42');
	}
	interface.setPrompt('>>');
	interface.prompt();;
});


function closeInterface(){
	console.log('Remember the answer!');
	process.exit();
}

interface.on('line', function(cmd){
	if(cmd.trim() == '.leave')
	{
		closeInterface();
		return;
	}
	else
	{
		console.log('That is the answer though you input: ' + cmd);
	}
	interface.setPrompt('>>');
	interface.prompt();
});

interface.on('close', function(){
	closeInterface();
});





