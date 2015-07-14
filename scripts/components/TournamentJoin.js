var React = require('react');
var _ = require('backbone/node_modules/underscore');

function gettournament(e){
		var Tournament = Parse.Object.extend('Tournament');
		var query = new Parse.Query(Tournament);
		query.get(e.props.tournamentid,{
		  success: function(results) {
		  	e.setState({
		  		
		  		tournament:results
		  	})
		  },
		  error: function(error) {

		  }
		});
	}
function newTeam(teamName){
	var Team = Parse.Object.extend("Team");
	var UP = new Team();

	UP.set("Name",teamName );
	UP.set("leaderId", window.userProfile.get('Username'))

	



	UP.save(null, {
	  success: function() {
	
	  },
	  error: function() {
	  
  }
});
}
module.exports = React.createClass({
	
	componentDidMount:function(){
		gettournament(this);
	},
	getInitialState:function(){
		
		return{tournament: new Parse.Object('Tournament')};
	},
	tournamentjoin: function(){
		myRouter.navigate('//'+e.target.value,{trigger:true});
	},
	createteam: function(){
		var newTeamName= this.refs.teamname.getDOMNode().value
		newTeam(newTeamName);



	},
	render: function() {
		
		
		return (
			<form onSubmit={this.TournamentList}>
				<div className="pricetoenter">Price: </div>
				<input ref="teamname" className="teamname" placeholder="Team Name"></input>
				<input ref="gamertag" className="gamertag" placeholder="Gamertag"></input>
				<button onClick={this.createteam} className="createteam" placeholder="Create Team" type="button"></button>

			</form>
		);
	}
});