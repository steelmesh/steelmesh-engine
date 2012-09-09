// # mesh.publish
// The publish operation is used to package a node application from your 
// local filesystem to a Couch repository.
function publish(mesh, opts, callback) {
	mesh.run(['connect', 'query'], function(err) {
		if (err) return callback(err);
	});
}

module.exports = publish;