var async = require('async'),
	request = require('request'),
	regexes = require('../regexes');

// # mesh.connect
// The connect operation is used to establish connections
function connect(mesh, opts, callback) {

	// iterate through the connections specified
	// and initialize 
	async.forEach(
		opts.connections,

		function(url, connectCallback) {
			// get the information for the data
			mesh.info('connecting: ' + url);
			request.get(url, function(err, res) {
				if (res && (! regexes.statusOK.test(res.statusCode))) {
					err = new Error('Unable to connect to: ' + url);
				}

				connectCallback(err);
			});
		},

		callback
	);
}

module.exports = connect;