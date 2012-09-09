var assert = require('assert'),
	steelmesh = require('../..'),
	request = require('request'),
	_ = require('underscore'),
	adminPass = process.env['TESTDB_ADMIN_PASS'],
	opts = require('../helpers/opts'),
	adminOpts = _.extend({}, opts, {
		db: opts.db
			.replace(/(steelmesh\.)/, 'admin:' + adminPass + '@$1')
			.replace(/test$/, 'test' + new Date().getTime())
	});

describe('steelmesh is capable of priming a new Couch database', function() {
	// ensure that we have an admin pass to work with
	before(function() {
		assert(adminPass, 'No admin password available, define in the "TESTDB_ADMIN_PASS" environment variable');
	});

	after(function(done) {
		request({ uri: adminOpts.db, method: 'DELETE' }, done);
	});

	it('should be able to create a new db', function(done) {
		steelmesh(adminOpts).createdb(function(err) {
			assert.ifError(err);
			done();
		});
	});

	it('should be able to create views on the new db', function(done) {
		// TODO
		done();
	});

	it('should be able to delete the test db', function(done) {
		// TODO
		done();
	});

	it('should be able to prime the db with a single call', function(done) {
		steelmesh(adminOpts).prime(function(err) {
			assert.ifError(err);
			done();
		});
	});
});