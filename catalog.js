function Catalog() {
	this.apps = {};
	this.profiles = {};
}

Catalog.prototype = {
	appDefine: function(data) {
		console.log(data);
	},

	profileDefine: function(data) {

	}
};

exports.create = function() {
	return new Catalog();
};