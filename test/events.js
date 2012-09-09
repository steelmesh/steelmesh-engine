var assert = require('assert'),
	steelmesh = require('..'),
	testOpts = require('./helpers/opts');

describe('steelmesh correctly implements piper and supports eventing', function() {
	it('should pass through custom events', function(done) {
		steelmesh()
			.on('customtest', done)
			.emit('customtest');
	});

	it('should trigger a ready event when ready', function(done) {
		var readyTriggered = false;

		steelmesh(testOpts)
			.on('ready', function() {
				readyTriggered = true;
			})
			.start(function(err) {
				assert.ifError(err);
				assert(readyTriggered, 'ready event not triggered');

				done(err);
			});
	});
});