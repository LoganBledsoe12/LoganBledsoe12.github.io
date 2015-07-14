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
module.exports = React.createClass({
	// componentWillMount: function() {
	// 	// this.props.posts.on('add', this.postAdded);
	// },
	// getInitialState: function() {
	// 	// return {
	// 	// 	number: this.props.number
	// 	// };
	// },
	componentDidMount:function(){
		gettournament(this);
	},
	getInitialState:function(){
		
		return{tournament: new Parse.Object('Tournament')};
	},
	tournamentjoin: function(){
		myRouter.navigate('/tournamentjoin/'+this.props.tournamentid,{trigger:true});
	},
	render: function() {
		
		
		return (
			<form onSubmit={this.TournamentList}>
				<div>Registration Begins: {this.state.tournament.get('RegistrationBegins')}</div>
				<div>Registration Ends: {this.state.tournament.get('RegistrationEnds')}</div>
				<div>Price to enter: {this.state.tournament.get('Cost')}</div>
				<div>Bracket size: {this.state.tournament.get('BracketSize')}</div>
				<div>total current teams: {this.state.tournament.get('TotalTeams')}</div>
				<div>min max team size: {this.state.tournament.get('MinMaxTeamSize')}</div>
				<div>Price to win: {this.state.tournament.get('Prize')}</div>
				<button onClick={this.tournamentjoin} className="jointrny" type="button">Join Tournament</button>
			</form>
		);
	}
});