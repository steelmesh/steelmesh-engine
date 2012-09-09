var assert = require('assert'),
	steelmesh = require('..'),
	request = require('request'),
	adminOpts = require('./helpers/opts').createOpts;

describe('steelmesh is capable of priming a new Couch database', function() {
	after(function(done) {
		request({ uri: adminOpts.db, method: 'DELETE' }, done);
	});

	it('should be able to create a new db', function(done) {
		steelmesh(adminOpts).createdb(function(err) {
			assert.ifError(err);
			done();
		});
	});
});