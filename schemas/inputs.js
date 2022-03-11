module.exports.ip = {
	properties: {
		ip: {
			description:
				'Ingrese la IP del servidor \nPara escuchar en todas las ips ingrese 0.0.0.0\nIP:',
			pattern:
				/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/,
			message: 'La IP no es válida',
			required: true,
		},
	},
};

module.exports.port = {
	properties: {
		port: {
			description: 'Ingrese el puerto del servidor \nPuerto:',
			type: 'number',
			message: 'El puerto no es válido',
		},
	},
};
module.exports.ipToSend = {
	properties: {
		ipToSend: {
			description: 'Ingrese la IP del servidor al que quiere enviar\nIP:',
			pattern:
				/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/,
			message: 'La IP no es válida',
			required: true,
		},
	},
};

module.exports.portToSend = {
	properties: {
		portToSend: {
			description:
				'Ingrese el puerto del servidor al que quiere enviar \nPuerto:',
			type: 'number',
			message: 'El puerto no es válido',
		},
	},
};

module.exports.stop = {
	properties: {
		stop: {
			description: '',
			type: 'boolean',
		},
	},
};

module.exports.interval = {
	properties: {
		interval: {
			description:
				'Ingrese el intervalo de refresco de la tabla (En milisegundos)\nIntervalo:',
			type: 'number',
			message: 'El intervalo no es válido',
			required: true,
		},
	},
};

module.exports.condicional = {
	properties: {
		condicional: {
			description: 'Ingrese T(SI)/F(NO) para continuar',
			pattern: /^[TF]$/,
			type: 'boolean',
			required: true,
			message: 'El valor ingresado no es válido',
		},
	},
};

module.exports.message = {
	properties: {
		message: {
			description: 'Ingrese el mensaje a enviar',
			type: 'string',
			required: true,
			message: 'Debe ingresar un mensaje.',
		},
	},
};
