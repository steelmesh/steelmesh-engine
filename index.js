var async = require('async'),
	fs = require('fs'),
	path = require('path'),
	piper = require('piper'),
	_ = require('underscore'),
	defaultOpts = {
		id: 'steelmesh',
		connections: []
	},
	reJSFile = /\.js$/i,

	// locate operations specified in the operations directory
	discoveredOps = fs.readdirSync(path.resolve(__dirname, 'operations'))
		.filter(reJSFile.test.bind(reJSFile))
		.map(function(opName) {
			return path.basename(opName, '.js');
		});

function run(mesh, opts, tasks, callback) {
	// initialise the tasks
	tasks = tasks.map(function(task) {
		return require('./operations/' + task).bind(mesh, mesh, opts);
	});

	// run the initialization tasks 
	async.series(tasks, callback);
}

function steelmesh(opts) {
	var mesh;

	// initialise default options
	opts = _.extend({}, defaultOpts, opts);

	// unbind all opts.id handlers
	piper.eve.unbind(opts.id);

	// use piper to create an event chain
	mesh = piper(opts.id);

	// create a generic logger function
	mesh.log = mesh.bind(mesh, 'log.debug');

	// bind the logging events
	['warn', 'info', 'debug'].forEach(function(logLevel) {
		mesh[logLevel] = mesh.bind(mesh, 'log.' + logLevel);
	});

	// attach the run helper
	mesh.run = run.bind(mesh, mesh, opts);

	// attach the operations modules
	discoveredOps.forEach(function(opName) {
		var opFn = require('./operations/' + opName);

		// if we have a conflict report an error
		if (mesh.hasOwnProperty(opName)) throw new Error('Invalid operation name: ' + opName);

		// if the option function is empty, then throw an error
		if (typeof opFn != 'function') throw new Error('No operation export for operation: ' + opName);

		// bind the operation to the mesh object
		mesh[path.basename(opName, '.js')] = opFn.bind(mesh, mesh, opts);
	});

	// return the mesh instance
	return mesh;
}

// export steelmesh
module.exports = steelmesh;