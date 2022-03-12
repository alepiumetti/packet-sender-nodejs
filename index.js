// Import modules

var inquirer = require('inquirer');

//  Import functions

const udpFunctions = require('./src/udpFunctions.js');
const tableFunctions = require('./src/tableFunctions.js');

// Internal Functions

// Init program

console.clear();
console.log('Bienvenido a Packet Sender para NodeJs. \n');

// Select option on menu

inquirer
	.prompt([
		{
			type: 'list',
			message: 'Selecciona una opción: ',
			name: 'option',
			choices: ['Recibir paquetes UDP', 'Enviar paquetes UDP', 'Salir'],
		},
	])
	.then((res) => {
		switch ((key = res.option)) {
			case 'Recibir paquetes UDP':
				inquirer
					.prompt([
						{
							type: 'input',
							name: 'ip',
							message:
								'Que ip quieres escuchar?\nSi quiere escuchar todas aprete enter\nIP:',
							validate(value) {
								const pass = value.match(
									/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/
								);
								if (pass) {
									return true;
								}
							},
							default() {
								return '0.0.0.0';
							},
						},
						{
							type: 'input',
							name: 'port',
							message: 'Que puerto quieres escuchar?\nPuerto:',
							validate(value) {
								const pass = value.match(/^[0-9]+$/);
								if (pass) {
									return true;
								}
							},
						},
					])
					.then(({ ip, port }) => {
						udpFunctions.openServerUdp(ip, port);

						let messageRevieved = []; // Array for messages - Max 30

						udpFunctions.listenServerUdp(messageRevieved);

						inquirer
							.prompt([
								{
									type: 'input',
									name: 'interval',
									message: 'Cuanto intervalo quieres?\nIntervalo:',
									validate(value) {
										const pass = value.match(/^[0-9]+$/);
										if (pass) {
											return true;
										}
									},
									default() {
										return 1000;
									},
								},
							])
							.then(({ interval }) => {
								let intervaloTabla = setInterval(async () => {
									console.clear();
									// Ask for stop

									tableFunctions.showTable(messageRevieved, port, ip);
									// prompt.get(schemas.stop, (err, result) => {
									// 	if (err) {
									// 		return console.log(err);
									// 	}

									// 	stop = result.sstop;
									// });

									// if (stop) {
									// 	clearInterval(intervaloTabla);
									// }
								}, interval);
								//Show table and wait for stop
							})
							.catch((error) => {
								if (error.isTtyError) {
									console.log(
										'Se ha producido un error en la ejecución del programa: ',
										error
									);
								} else {
									console.log(
										'Se ha producido un error en la ejecución del programa: ',
										error
									);
								}
							});
					})
					.catch((error) => {
						if (error.isTtyError) {
							console.log(
								'Se ha producido un error en la ejecución del programa: ',
								error
							);
						} else {
							console.log(
								'Se ha producido un error en la ejecución del programa: ',
								error
							);
						}
					});
				break;

			case 'Enviar paquetes UDP':
				console.log('Esta funcion esta en construccion');

				break;

			case 'Salir':
				console.log('Adios');
				process.exit();
				break;

			default:
				break;
		}
	})
	.catch((error) => {
		if (error.isTtyError) {
			console.log(
				'Se ha producido un error en la ejecución del programa: ',
				error
			);
			process.exit();
		} else {
			console.log(
				'Se ha producido un error en la ejecución del programa: ',
				error
			);
			process.exit();
		}
	});

// prompt.get([schemas.menuSelect], (err, result) => {
// 	switch (result.select) {
// 		case 0:
// 			// Listen UDP

// 			// Ask for IP and Port

// 			prompt.get([schemas.ip, schemas.port], (err, result) => {
// 				if (err) {
// 					return console.log(err);
// 				}

// 				ip = result.ip;
// 				port = result.port;

// 				// Open UDP server

// 				udpFunctions.openServerUdp(ip, port);

// 				let messageRevieved = []; // Array for messages - Max 30

// 				udpFunctions.listenServerUdp(messageRevieved);

// 				let interval; // Interval for show table
// 				prompt.get(schemas.interval, (err, result) => {
// 					if (err) {
// 						return console.log(err);
// 					}

// 					interval = result.interval;

// 					let stop = false;

// 					do {
// 						// let intervaloTabla = setInterval(async () => {
// 						// console.clear();
// 						// Ask for stop

// 						setTimeout(() => {
// 							tableFunctions.showTable(messageRevieved, port, ip);
// 							prompt.get(schemas.stop, (err, result) => {
// 								if (err) {
// 									return console.log(err);
// 								}

// 								stop = result.stop;
// 							});
// 						}, interval);

// 						// if (stop) {
// 						// 	clearInterval(intervaloTabla);
// 						// }
// 						// }, interval);
// 						//Show table and wait for stop
// 					} while (!stop);

// 					// const { condicional } = await prompt.get(schemas.condicional);

// 					// if (condicional) {
// 					// 	const { message } = await prompt.get(schemas.message);
// 					// 	udpFunctions.sendMessageUdp(message, port, ip);
// 					// } else {
// 					// }
// 				});
// 			});

// 			break;
// 		case 1:
// 			// Send UDP
// 			break;

// 		case 2:
// 			// Exit
// 			process.exit();

// 		default:
// 			console.log('default');
// 			break;
// 	}
// });

// for test
//puerto 40060
