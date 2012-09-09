var connect = require('./connect'),
	errs = require('errs'),
	request = require('request'),
	regexes = require('../lib/regexes');

/**
# mesh.createdb

This operation is used to create a new CouchDB database suitable for
use with steelmesh.
*/
module.exports = function(mesh, opts, callback) {
	var createOpts = {
			uri: opts.db,
			method: 'PUT'
		};

	// attempt the connection, and if we have a failure then 
	// attempt to create the db and reattempt connect
	connect(mesh, opts, function(err) {
		// if we received an error, then attempt to create the db
		if (err) {
			request(createOpts, function(err, res, body) {
				if (res && (! regexes.statusOK.test(res.statusCode))) {
					err = errs.create({
						message: 'Unable to create db: ' + opts.db + ' (' + body + ')',
						response: res
					});
				}

				// if we have an error, then trigger the callback with the error
				if (err) {
					return callback(err);
				}
				// otherwise, attempt another connection to validate success
				else {
					return connect(mesh, opts, callback);
				}
			});
		}
		// otherwise, fire the callback
		else {
			return callback();
		}
	});
};