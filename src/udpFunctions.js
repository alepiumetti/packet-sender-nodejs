const dgram = require('dgram');

let server;

module.exports.listenServerUdp = (messageRevieved) => {
	server.on('message', function (message, remote) {
		//Limit messages on array

		const limit = 20;

		const data = {
			message: message.toString(),
			date: new Date().toLocaleString(),
			ip: remote.address,
			port: remote.port,
		};

		if (messageRevieved.length >= limit) {
			messageRevieved.shift();

			messageRevieved.push(data);
		} else {
			messageRevieved.push(data);
		}
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
				resolve('Mensaje enviado con exito.');
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
