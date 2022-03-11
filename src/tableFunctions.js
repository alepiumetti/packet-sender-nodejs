let Table = require('easy-table');

module.exports.showTable = (data, port, ip) => {
	let table = new Table();

	data.forEach((element) => {
		table.cell('Fecha', element.date);
		table.cell('IP', element.ip);
		table.cell('Puerto', element.port);
		table.cell('Mensaje', element.message);

		table.newRow();
	});
	console.log('UDP Server escuchando en ' + ip + ':' + port + '\n');

	console.log(table.toString());
};
