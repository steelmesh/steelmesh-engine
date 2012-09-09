var errs = require('errs'),
	regexes = require('../lib/regexes'),
	catalog = require('../catalog');

// # mesh.query
// This operation is used to query the currently connected db and initialize
// the applications and profiles that are stored in that database.
// 
// ## Operation Prereqs
// - mesh.db connection has been defined and is a valid nano connection
function query(mesh, opts, callback) {
	mesh.db.view('steelmesh', 'catalog', function(err, data) {
		if (err) return callback(errs.create('Unable to locate catalog view'));

		// create the mesh catalog
		mesh.catalog = catalog.create();

		// iterate through the rows and populate the app catalog
		data.rows.forEach(function(row) {
			// split the id on double colon characters
			var parts = row.id.split('::'),
				type = parts.length > 1 ? parts[0] : 'app',
				handler = mesh.catalog[type + 'Define'];

			// if the handler is undefined, then update the error
			if (! handler) {
				err = err || new Error('Unknown row type of "' + type + '" for row id: ' + row.id);
			}
			else {
				handler.call(mesh.catalog, row.id, row.value);
			}
		});

		callback(err);
	});
}

module.exports = query;