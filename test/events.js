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
		steelmesh(testOpts)
			.on('ready', done)
			.start();
	});
});