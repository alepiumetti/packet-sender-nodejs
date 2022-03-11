// Import modules

const prompt = require('prompt');

// Import schemas for inputs

const schemas = require('./schemas/inputs');

//  Import functions

const udpFunctions = require('./src/udpFunctions.js');
const tableFunctions = require('./src/tableFunctions.js');

// Constants

// Internal Functions

const showTableAndWait = (interval, messageRevieved, port, ip) => {
	return new Promise((resolve, reject) => {
		let intervaloTabla = setInterval(async () => {
			console.clear();
			tableFunctions.showTable(messageRevieved, port, ip);
			// Ask for stop

			const { stop } = await prompt.get(schemas.stop);

			if (stop) {
				clearInterval(intervaloTabla);
				resolve();
			}
		}, interval);
	});
};

// Config prompt

prompt.message = 'PSN - ';
prompt.delimiter = '';

// Start the prompt
prompt.start();

// Init program

console.log('Bienvenido a Packet Sender para NodeJs. \n');

const mainFunction = async () => {
	// Ask for IP and Port

	const { ip, port } = await prompt.get([schemas.ip, schemas.port]);

	// Open UDP server

	await udpFunctions.openServerUdp(ip, port);

	let messageRevieved = []; // Array for messages - Max 30

	udpFunctions.listenServerUdp(messageRevieved);

	const { interval } = await prompt.get(schemas.interval);

	//Show table and wait for stop

	showTableAndWait(interval, messageRevieved, port, ip).then(async () => {
		const { condicional } = await prompt.get(schemas.condicional);

		if (condicional) {
			const { message } = await prompt.get(schemas.message);
			udpFunctions.sendMessageUdp(message, port, ip);
		}
	});
};

mainFunction();

// for test
//puerto 40060
