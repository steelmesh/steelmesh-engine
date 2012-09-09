

// # mesh.monitor
// The monitor operation monitors the connected db for changes
function monitor(mesh, opts, callback) {
	var feed = mesh.db.follow({ since: 'now', include_docs: true });

	feed.on('change', function(change) {
		// TODO: update the application
	});

	// start following
	feed.follow();

	// done - trigger the callback
	callback();
}

module.exports = monitor;