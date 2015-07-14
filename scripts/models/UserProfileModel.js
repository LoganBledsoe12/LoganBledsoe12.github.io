var Backbone = require('backparse')({
    appId: window.appId,
    apiKey:window.appKey,
    apiVersion: 1
});

module.exports = Backbone.Model.extend({
	defaults:  {
		Username:'',
		CreditBalance: 0,
		ProfileViews: 0,
		
	},
	parseClassName:'UserProfile',
	idAttribute: 'objectId'
});	