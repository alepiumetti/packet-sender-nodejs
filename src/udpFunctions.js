const dgram = require('dgram');

const server = dgram.createSocket('udp4');

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

module.exports.closeServerUdp = () => {};

module.exports.openServerUdp = (ip, port) => {
	return new Promise((resolve, reject) => {
		server.on('listening', function () {
			var address = server.address();
		});

		server.bind(port, ip);
		resolve('Servidor UDP iniciado en el puerto: ' + port);
	});
};
