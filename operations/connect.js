var async = require('async'),
	errs = require('errs'),
	nano = require('nano'),
	request = require('request'),
	regexes = require('../regexes');

// # mesh.connect
// The connect operation is used to establish a connection to the 
// db specified in the options.  If this operation is successful, 
// the mesh object will have a db object bound to which is a nano
// database object.
function connect(mesh, opts, callback) {

	// if the connection db is not defined, report a validation error
	if (! opts.db) return callback(new Error('No "db" setting provided in configuration opts'));

	// get the information for the data
	mesh.info('connecting: ' + opts.db);
	request.get(opts.db, function(err, res) {
		if (res && (! regexes.statusOK.test(res.statusCode))) {
			err = errs.create({
				message: 'Unable to connect to: ' + opts.db,
				response: res
			});
		}

		// if we haven't received an error, then initialize the mesh.db connection
		mesh.db = nano(opts.db);

		// trigger the callback
		callback(err);
	});
}

module.exports = connect;