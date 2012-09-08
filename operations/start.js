var async = require('async'),
	connect = require('./connect');

// # mesh.start
// This operation is used to start a steelmesh instance running
module.exports = function(mesh, opts, callback) {
	var tasks = ['connect'];

	// initialise the tasks
	tasks = tasks.map(function(task) {
		return require('./' + task).bind(mesh, mesh, opts);
	});

	// run the initialization tasks 
	async.series(tasks, function(err) {
		mesh.emit(err ? 'ready' : 'error', err);
	});
};