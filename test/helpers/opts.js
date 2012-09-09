var _ = require('underscore'),
	baseOpts = {
		db: 'http://steelmesh.iriscouch.com/test'	
	};

// add the admin level opts
baseOpts.adminLevel = _.extend({}, baseOpts, {
	db: 'http://admin:oor5ak4ti@steelmesh.iriscouch.com/test'
});

// add the create test opts
baseOpts.createOpts = _.extend({}, baseOpts.adminLevel, {
	db: baseOpts.adminLevel.db.replace(/test$/, 'test' + new Date().getTime())
});

console.log(baseOpts.createOpts);
module.exports = baseOpts;