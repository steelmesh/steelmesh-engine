// # mesh.start
// This operation is used to start a steelmesh instance running
module.exports = function(mesh, opts, callback) {
	mesh.emit('ready');
};