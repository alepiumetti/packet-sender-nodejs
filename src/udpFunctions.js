// Import modules

const dgram = require('dgram');
const fs = require('fs');

// Import external functions and variables

const tableFunctions = require('./tableFunctions');

let server;

module.exports.listenServerUdp = (messageRevieved, persistir) => {
	server.on('message', function (message, remote) {
		//Limit messages on array

		const limit = 20;

		const data = {
			message: message.toString(),
			date: new Date().toLocaleString(),
			ip: remote.address,
			port: remote.port,
		};

		if (persistir) {
			fs.appendFile(
				'./data/log.csv',
				`${data.date},${data.ip},${data.port},${data.message}`,
				'utf8',
				(err) => {
					if (err) {
						console.log('Error al guardar dato en log', err);
					} else {
					}
				}
			);
		}

		if (messageRevieved.length >= limit) {
			messageRevieved.shift();

			messageRevieved.push(data);
		} else {
			messageRevieved.push(data);
		}

		tableFunctions.showTable(messageRevieved, remote.port, remote.address);
	});
};

module.exports.openServerAndSendMessageUdp = (message, ip, port) => {
	return new Promise((resolve, reject) => {
		var client = dgram.createSocket('udp4');
		//ENVIA DATA UDP
		let msg = new Buffer.from(message);

		try {
			client.send(msg, 0, msg.length, port, ip, function (err, bytes) {
				if (err) {
					throw err;
				}
				resolve(message + ' enviado con exito a ' + ip + ':' + port);
				client.close();
			});
		} catch (error) {
			client.close();
			reject('Error al enviar el mensaje UDP: ' + error);
		}
	});
};

module.exports.sendMessagesUdp = (ip, port, message) => {
	var client = dgram.createSocket('udp4');
	//ENVIA DATA UDP
	let msg = new Buffer.from(message);

	try {
		client.send(msg, 0, msg.length, port, ip, function (err, bytes) {
			if (err) {
				throw err;
			}
			client.close();
		});
	} catch (error) {
		console.log('Error al envíar mensaje UDP');
		client.close();
	}
};

module.exports.openServerUdp = (ip, port) => {
	server = dgram.createSocket('udp4');

	return new Promise((resolve, reject) => {
		server.on('listening', function (res) {
			var address = server.address();
			resolve();
		});

		server.bind(port, ip);
	});
};

module.exports.closeServerUdp = () => {
	return new Promise((resolve, reject) => {
		server.close();
		resolve('Servidor UDP cerrado');
	});
};
