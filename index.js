// Import modules

let inquirer = require('inquirer');
let fs = require('fs');

// Constants

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

							udpFunctions
								.openServerUdp('0.0.0.0', port)
								.then(() => {
									udpFunctions.listenServerUdp(messageRevieved);
								})
								.catch((error) => {
									console.log(
										'Hubo un error al abrir el servidor UDP: ' + error
									);
								});
						})
						.catch((err) => {
							console.log('Hubo un error al enviar mensaje' + err);
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

// Select option on menu

const main = () => {
	// console.clear();
	console.log('Bienvenido a Packet Sender para NodeJs. \n');
	inquirer
		.prompt([
			{
				type: 'list',
				message: 'Selecciona una opción: ',
				name: 'option',
				choices: [
					'Recibir paquetes UDP',
					'Enviar paquetes UDP',
					'Ayuda',
					'Salir',
				],
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
							inquirer
								.prompt([
									{
										type: 'confirm',
										message: 'Desea guardar el log de recepción en un .CSV?:',
										name: 'persistir',
									},
								])
								.then(({ persistir }) => {
									if (persistir) {
										fs.stat('./data/log.csv', (err, stats) => {
											if (!stats) {
												fs.createWriteStream('./data/log.csv');
											}
										});
									}

									udpFunctions
										.openServerUdp(ip, port)
										.then((res) => {
											let messageRevieved = []; // Array for messages - Max 20
											console.log('Esperando por mensajes');
											udpFunctions.listenServerUdp(messageRevieved, persistir);
										})
										.catch((err) =>
											console.log('Error al conectar con servidor', err)
										);
								})
								.catch((err) => {
									console.log('Error al elegir opción: ', err);
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
				}

				case 'Enviar paquetes UDP':
					inquirer
						.prompt([
							{
								type: 'list',
								message: 'Selecciona una opción: ',
								name: 'option',
								choices: [
									'Enviar un mensaje',
									'Enviar mensajes en intervalo de tiempo',
								],
							},
						])
						.then(({ option }) => {
							switch (option) {
								case 'Enviar un mensaje':
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

														//EL COMANDO -L ENVIA UN MENSAJE Y LUEGO ESCUCHA EN LA IP 0.0.0.0 Y PUERTO

														if (splittedMsg[splittedMsg.length - 1] === '-l') {
															let msgToSend = message.slice(0, -2);

															udpFunctions
																.openServerAndSendMessageUdp(
																	msgToSend,
																	ip,
																	port
																)
																.then((response) => {
																	let messageRevieved = [];

																	udpFunctions
																		.openServerUdp('0.0.0.0', port)
																		.then(() => {
																			udpFunctions.listenServerUdp(
																				messageRevieved
																			);
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

								case 'Enviar mensajes en intervalo de tiempo':
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
														inquirer
															.prompt([
																{
																	type: 'input',
																	name: 'interval',
																	message:
																		'Escribe el intervalo de tiempo en milisegundos para envíar el mensaje:',
																},
															])
															.then(({ interval }) => {
																setInterval(() => {
																	udpFunctions
																		.openServerAndSendMessageUdp(
																			message,
																			ip,
																			port
																		)
																		.then((response) => {
																			console.log(response);
																		})
																		.catch((err) => {
																			console.log(err);
																		});
																}, interval);
															});
													} else {
														console.log('No has escrito nada');
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

								default:
									break;
							}
						});

					break;

				case 'Ayuda':
					console.log('Comandos:');
					console.log('Generales');
					console.log(' - Ctrl + C: Salir del programa');

					console.log('\n _________________________ \n');

					console.log(
						'Repositorio: https://github.com/alepiumetti/packet-sender-nodejs'
					);

					console.log('\n _________________________ \n');

					inquirer
						.prompt([
							{
								type: 'confirm',
								name: 'conditional',
								message: 'Quieres volver al menu? :',
							},
						])
						.then(({ conditional }) => {
							if (conditional) {
								main();
							} else {
								console.log('Adios');
								process.exit();
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

					break;

				case 'Salir':
					inquirer
						.prompt([
							{
								type: 'confirm',
								name: 'conditional',
								message: 'Seguro que desea salir?:',
							},
						])
						.then(({ conditional }) => {
							if (!conditional) {
								main();
							} else {
								console.log('Adios');
								process.exit();
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
};

// Args functions

const argsFunctions = (args) => {
	if (args[0] === '-h' || args[0] === '--help') {
		console.log('Argumentos:');
		console.log('-h o --help: Muestra esta ayuda');
		console.log(
			'-l o --listen [ip] [puerto] : Escucha en la ip y puerto indicado'
		);
		console.log('-s o --send [ip] [puerto] [mensaje] : Envia el mensaje');
		console.log(
			'-sr o --sendRepeat [ip] [puerto] [mensaje] : Envia un mensaje cada determinado tiempo'
		);
	} else if (args[0] === '-v' || args[0] === '--version') {
		console.log('Packet Sender NodeJS v1.0.0');
	} else if (args[0] === '-l' || args === '--listen') {
		if (
			args[1].match(
				/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/
			) &&
			args[2].match(/^[0-9]+$/)
		) {
			let ip = args[1].toString();
			let port = args[2].toString();

			udpFunctions.openServerUdp(ip, port).then(() => {
				let messageRevieved = [];

				udpFunctions.listenServerUdp(messageRevieved);
			});
		} else {
			console.log('Los argumentos ingresados no son correctos');
		}
	} else if (args[0] === '-s' || args[0] === '--send') {
		if (
			args[1].match(
				/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/
			) &&
			args[2].match(/^[0-9]+$/) &&
			args[3]
		) {
			let ip = args[1].toString();
			let port = args[2].toString();
			let message = args[3];

			console.clear();
			console.log(message + ' enviado a ' + ip + ':' + port);
			udpFunctions.sendMessagesUdp(ip, port, message);
		}
	} else if (args[0] === '-sr' || args[0] === '--sendRepeat') {
		if (
			args[1].match(
				/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/
			) &&
			args[2].match(/^[0-9]+$/) &&
			args[3] >= 1000 &&
			args[4]
		) {
			let ip = args[1].toString();
			let port = args[2].toString();
			let interval = args[3];
			let message = args[4];

			setInterval(() => {
				console.clear();
				console.log(
					'Enviando ' +
						message +
						' a ' +
						ip +
						':' +
						port +
						' cada ' +
						interval +
						' milisegundos'
				);
				udpFunctions.sendMessagesUdp(ip, port, message);
			}, interval);
		} else {
			console.log('Los argumentos ingresados no son correctos');
		}
	} else {
		console.log(
			'Error en los argumentos. Utilice -h o --help para ver la ayuda.'
		);
	}
};

// Init program

let args = process.argv.slice(2);

console.clear();

if (args.length === 0) {
	main();
} else {
	argsFunctions(args);
}
