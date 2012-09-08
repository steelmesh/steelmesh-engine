var fs = require('fs'),
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
		.filter(reJSFile.test.bind(reJSFile));

function steelmesh(opts) {
	var mesh;

	// initialise default options
	opts = _.extend({}, defaultOpts, opts);

	// unbind all opts.id handlers
	piper.eve.unbind(opts.id);

	// use piper to create an event chain
	mesh = piper(opts.id);

	// attach the operations modules
	discoveredOps.forEach(function(opName) {
		// if we have a conflict report an error
		if (mesh.hasOwnProperty(opName)) throw new Error('Invalid operation name: ' + opName);

		// bind the operation to the mesh object
		mesh[path.basename(opName, '.js')] = require('./operations/' + opName).bind(mesh, mesh);
	});

	// return the mesh instance
	return mesh;
}

// export steelmesh
module.exports = steelmesh;