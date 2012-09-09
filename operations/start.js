// # mesh.start
// This operation is used to start a steelmesh instance running
module.exports = function(mesh, opts, callback) {
	mesh.run(['connect', 'query', 'monitor'], function(err) {
		if (! err) {
			mesh.emit('ready');
		}

		callback(err);
	});
};