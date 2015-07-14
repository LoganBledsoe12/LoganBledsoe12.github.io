var Backbone = require('backparse')({
    appId: window.appId,
    apiKey:window.appKey,
    apiVersion: 1
});

module.exports = Backbone.Model.extend({
	defaults:  {
		user: '',
		password: null,
		email:''
	},
	parseClassName:'_User',
	idAttribute: 'objectId',
	isUser: true
});	
