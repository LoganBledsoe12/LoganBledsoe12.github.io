var React = require('react');
var $ = require('jquery');
var _ = require('backbone/node_modules/underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var TournamentList = require ('./components/TournamentComponent.js');
var TournamentJoin = require ('./components/TournamentJoin.js');
var SignUp = require ('./components/SignUpComponent');
var LogIn = require  ('./components/LogInComponent');
var UserProfile = require ('./components/ProfileComponent.js');
var HomePage = require ('./components/HomePageComponent.js');
var Header = require ('./components/HeaderComponent.js');
var Support = require ('./components/SupportComponent.js');
var TeamProfile = require ('./components/TeamProfileComponent.js');
var PayPal = require ('./components/PayPalComponent.js');
var TeamInvite = require ('./components/TeamInviteComponent.js')
window.appKey = ('S50qociHrxbaE0knB6LZawcp4MdWiHFu7myR6tyw');
window.appId = ('WfZ0jpkhseGLlEz2RcIhmkTK1jGQdvmILzE7dC7U');
window.userProfile = null
window.events = {
	userchanged: null
}
var App = Backbone.Router.extend({
    routes: {
        '': 'home',
        'login': 'login',
        'signup': 'signup',
        'profile': 'profile',
        'rules': 'rules',
        'tournamentinfo/:tournamentid': 'tournamentinfo',
        'createTrnyTeam':'createTrnyTeam',
        'trnyTeamList':'trnyTeamList',
        'paypal': 'paypal',
        'addcash':'addcash',
        'tournamentjoin/:tournamentid': 'tournamentjoin',
        'teamprofile/:teamid': 'teamprofile',
        'invite':'invite',
        'support': 'support'
       
    },
    home: function(){
	    React.render(
		<HomePage/>,
		document.getElementById('container')
		);
	},
	support: function(){
	    React.render(
		<Support/>,
		document.getElementById('container')
		);
	},
	invite: function(){
	    React.render(
		<TeamInvite/>,
		document.getElementById('container')
		);
	},

	teamprofile: function(teamid){
		$(document.getElementById('container')).empty();
		React.render(
		<TeamProfile teamid = {teamid}/>,
		document.getElementById('container')
		);
	},
    login: function(){
	    React.render(
		<LogIn/>,
		document.getElementById('container')
		);
	},
	addcash: function(){
		window.userProfile.set('Money', 5);
		window.userProfile.save();
	},
	signup: function(){
	    React.render(
		<SignUp/>,
		document.getElementById('container')
		);
	},
	profile: function(){
	    React.render(
		<UserProfile/>,
		document.getElementById('container')
		);
	},
	rules: function(){
	    React.render(
		<TournamentList />,
		document.getElementById('container')
		);
	},
	tournamentinfo: function(tournamentid){
		$(document.getElementById('container')).empty();
	    React.render(
		<TournamentList tournamentid = {tournamentid} />,
		document.getElementById('container')
		);
	},
	createtrnyteam: function(){
	    React.render(
		<TournamentList />,
		document.getElementById('container')
		);
	},
	paypal: function(){
	    React.render(
		<PayPal />,
		document.getElementById('container')
		);
	},
	tournamentjoin: function(){
	    React.render(
		<TournamentJoin />,
		document.getElementById('container')
		);
	},
	trnyTeamList: function(){
	    React.render(
		<TournamentList />,
		document.getElementById('container')
		);
	} 
});
var myRouter = new App();
Backbone.history.start();
window.myRouter = myRouter
 
 	$(function(){
 		React.render(
		<Header />,
		document.getElementById('header')
		);
	})
// 	var minimalData = {
//     teams : [
//       ["Team 1", "Team 2"], /* first matchup */
//       ["Team 3", "Team 4"]  /* second matchup */
//     ],
//     results : [
//       [[1,2], [3,4]],        first round 
//       [[4,6], [2,1]]        /* second round */
//     ]
//   }
 
// $(function() {
//     $('#bracket').bracket({
//       init: minimalData /* data to initialize the bracket with */ })
//   })





