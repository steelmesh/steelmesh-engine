// # mesh.prime
// The prime operation is used to ensure that the db specified in the configuration
// opts is created and ready for use.  
// 
// __NOTE:__ This operation requires admin level user permissions for the Couch instance.
function prime(mesh, opts, callback) {
	mesh.run(['createdb', 'createviews'], callback);
}

module.exports = prime;