// Import modules

var inquirer = require('inquirer');

//  Import functions

const udpFunctions = require('./src/udpFunctions.js');
const tableFunctions = require('./src/tableFunctions.js');

// Internal Functions

const sendMessage = (ip, port) => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'message',
				message: '$:',
				required: true,
			},
		])
		.then(({ message }) => {
			if (message !== '') {
				let splittedMsg = message.split(' ');

				//EL COMANDO -L ENVIA UN MENSAJE Y LUEGO ESCUCHA EN LA MISMA IP Y PUERTO

				if (splittedMsg[splittedMsg.length - 1] === '-l') {
					let msgToSend = message.slice(0, -2);

					udpFunctions
						.openServerAndSendMessageUdp(msgToSend, ip, port)
						.then((response) => {
							let messageRevieved = [];

							udpFunctions.openServerUdp('0.0.0.0', port).then(() => {
								udpFunctions.listenServerUdp(messageRevieved);

								let interval = setInterval(async () => {
									console.clear();

									// Ask for stop

									tableFunctions.showTable(messageRevieved, port, '0.0.0.0');
								}, 1000);
								//Show table and wait for stop
							});
						})
						.catch((err) => {
							console.log(err);
						});
				}
				udpFunctions
					.openServerAndSendMessageUdp(message, ip, port)
					.then((response) => {
						sendMessage(ip, port);
					})
					.catch((err) => {
						console.log(err);
					});
			}
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
};

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
		switch (res.option) {
			case 'Recibir paquetes UDP': {
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
						udpFunctions
							.openServerUdp(ip, port)
							.then((res) => {
								console.log(res);

								let messageRevieved = []; // Array for messages - Max 20

								udpFunctions.listenServerUdp(messageRevieved);

								inquirer
									.prompt([
										{
											type: 'input',
											name: 'interval',
											message: 'Cuanto intervalo quieres?\nIntervalo:',
											validate(value) {
												const pass = parseInt(value);
												if (!isNaN(pass)) {
													return true;
												}
											},
											default() {
												return '1000';
											},
										},
									])
									.then(({ interval }) => {
										// console.log(interval);

										setInterval(async () => {
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
							.catch((err) =>
								console.log('Error al conectar con servidor', err)
							);
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
			}

			case 'Enviar paquetes UDP':
				inquirer
					.prompt([
						{
							type: 'input',
							name: 'ip',
							message: 'A que ip quieres enviar?\nIP:',
							validate(value) {
								const pass = value.match(
									/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/
								);
								if (pass) {
									return true;
								}
							},
						},
						{
							type: 'input',
							name: 'port',
							message: 'A que puerto quieres enviar?\nPuerto:',
							validate(value) {
								const pass = value.match(/^[0-9]+$/);
								if (pass) {
									return true;
								}
							},
						},
					])
					.then(({ ip, port }) => {
						inquirer
							.prompt([
								{
									type: 'input',
									name: 'message',
									message: 'Escribe lo que quieres enviar:',
									required: true,
								},
							])
							.then(({ message }) => {
								if (message !== '') {
									let splittedMsg = message.split(' ');

									//EL COMANDO -L ENVIA UN MENSAJE Y LUEGO ESCUCHA EN LA MISMA IP Y PUERTO

									if (splittedMsg[splittedMsg.length - 1] === '-l') {
										let msgToSend = message.slice(0, -2);

										udpFunctions
											.openServerAndSendMessageUdp(msgToSend, ip, port)
											.then((response) => {
												let messageRevieved = [];

												udpFunctions.openServerUdp('0.0.0.0', port).then(() => {
													udpFunctions.listenServerUdp(messageRevieved);

													let interval = setInterval(async () => {
														console.clear();

														// Ask for stop

														tableFunctions.showTable(
															messageRevieved,
															port,
															'0.0.0.0'
														);
													}, 1000);
													//Show table and wait for stop
												});
											})
											.catch((err) => {
												console.log(err);
											});
									}

									udpFunctions
										.openServerAndSendMessageUdp(message, ip, port)
										.then((response) => {
											sendMessage(ip, port);
										})
										.catch((err) => {
											console.log(err);
										});
								}
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
