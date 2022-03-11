const dgram = require('dgram');

const server = dgram.createSocket('udp4');

module.exports.listenServerUdp = (messageRevieved) => {
	server.on('message', function (message, remote) {
		//Limit messages on array

		const limit = 30;

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

module.exports.sendMessageUdp = (message, port, ip) => {
	var client = dgram.createSocket('udp4');
	//ENVIA DATA UDP
	// console.log('Envía data UDP - SHUTDOWN - a: ', host);
	let msg = new Buffer.from(message);

	try {
		client.send(
			msg,
			0,
			msg.length,
			port,
			'192.168.1.177',
			function (err, bytes) {
				if (err) {
					throw err;
				}
				client.close();
			}
		);
	} catch (error) {
		console.log('Error al enviar el mensaje UDP: ', error);
		client.close();
	}
};

module.exports.openServerUdp = (ip, port) => {
	server.on('listening', function () {
		var address = server.address();
	});

	server.bind(port, ip);
};
