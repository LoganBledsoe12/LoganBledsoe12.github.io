var React = require('react');
var _ = require('backbone/node_modules/underscore');


function getteam(e){
		var Team = Parse.Object.extend('Team');
		var query = new Parse.Query(Team);
		query.get(e.props.teamid,{
		  success: function(results) {
		  	e.setState({
		  		
		  		team:results
		  	})
		  },
		  error: function(error) {

		  }
		});
	}
module.exports = React.createClass({
	
	componentDidMount:function(){
		getteam(this);
	},
	getInitialState:function(){
		
		return{team: new Parse.Object('Team')};
	},
	tournamentjoin: function(){
		myRouter.navigate('/tournamentjoin/'+this.props.tournamentid,{trigger:true});
	},


	getprofile:function(me){
	var username= this.refs.searchplayer.getDOMNode().value
	var UserProfile = Parse.Object.extend('UserProfile');
	var currentUser = Parse.User.current();
	console.log(currentUser)
	var query = new Parse.Query(UserProfile);
	query.equalTo('Username',username);
	query.find({
	  success: function(results) {
	  	window.userProfile = results[0]
	  	me.setState({
	  		username:currentUser.attributes.username,
	  		profile:results[0]
	  	})
	    for (var i = 0; i < results.length; i++) {
	      var object = results[i];
	    }
	  },
	  error: function(error) {

	  }
	});
},
	render: function() {
		
		
		return (
			<form onSubmit={this.TournamentList}>
				<div>{this.state.team.get('Name')} </div>
				<input ref="searchplayer" className="searchplayer"> </input>
				<button onClick={this.getprofile} ref="search" className="search" type="button">Search User </button>

			</form>
		);
	}
});