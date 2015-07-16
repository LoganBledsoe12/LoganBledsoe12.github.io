var React = require('react');
var _ = require('backbone/node_modules/underscore');


function getteam(e){
		var Team = Parse.Object.extend('Team');
		var query = new Parse.Query(Team);
		query.include('Players')
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
		var t = new Parse.Object('Team')
		t.set('Players',[])
		return{team:t};
	},
	tournamentjoin: function(){
		myRouter.navigate('/tournamentjoin/'+this.props.tournamentid,{trigger:true});
	},
	removeplayer: function(player){
		var me = this;
		var p = this.state.team.get('Players')
		var i = p.indexOf(player)
		p.splice(i,1);
		this.state.team.set('Players',p)
		this.state.team.save({success:function(){
			getteam(me);
		}});
	},


	getprofile:function(me){
	var username= this.refs.searchplayer.getDOMNode().value
	var UserProfile = Parse.Object.extend('UserProfile');
	var currentUser = Parse.User.current();
	console.log(currentUser)
	var me = this;
	var query = new Parse.Query(UserProfile);
	query.equalTo('Username',username);
	query.find({
	  success: function(results) {
	  	var Invite = Parse.Object.extend('Invite');
	  	var i = new Invite();
	  	i.save({UserId:results[0].id,Team:me.state.team});
	  },
	  error: function(error) {

	  }
	});
},
	render: function() {
	var me = this;	
		
		return (
			<form onSubmit={this.TournamentList}>
				<div>{this.state.team.get('Name')} </div>
				{
					


					this.state.team.get('Players').map(function(m,index){
                	return (<div>{m.get('Username')}<button onClick={me.removeplayer.bind(me,m)} className="removeplayer" type="button">Remove Player</button></div>
                		)               
                })

                }
				<input ref="searchplayer" className="searchplayer"> </input>
				<button onClick={this.getprofile} ref="search" className="search" type="button">Invite User </button>

			</form>
		);
	}
});