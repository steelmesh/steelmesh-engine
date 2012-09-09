// # mesh.query
// This operation is used to query the currently connected db and initialize
// the applications and profiles that are stored in that database.
// 
// ## Operation Prereqs
// - mesh.db connection has been defined and is a valid nano connection
function query(mesh, opts, callback) {
	mesh.db.list(function(err, data) {
		if (err) return callback(err);

		console.log(data);

		callback(err);
	});
}

module.exports = query;