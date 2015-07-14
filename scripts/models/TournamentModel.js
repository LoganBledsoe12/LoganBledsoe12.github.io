var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = Backbone.Model.extend({
	defaults: {
		registrationEnds: '',
		tournamentBegins: '',
		brackSize: '',
		totalTeams: null,
		minMaxTeamSize: null,
		prize:null,
		credits:null
	}
});