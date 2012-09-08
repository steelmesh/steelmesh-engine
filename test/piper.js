var assert = require('assert'),
	steelmesh = require('..');

describe('steelmesh correctly implements piper and supports eventing', function() {
	it('should pass through custom events', function(done) {
		steelmesh().on('customtest', done).emit('customtest');
	});
});