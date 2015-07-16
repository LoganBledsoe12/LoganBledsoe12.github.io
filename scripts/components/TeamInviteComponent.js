var React = require('react');
var _ = require('backbone/node_modules/underscore');


module.exports = React.createClass({
	
	componentDidMount:function(){
		this.getinvite(this);
	},
	getInitialState:function(){
		
		return{invites: []};
	},
	tournamentjoin: function(){
		myRouter.navigate('/tournamentjoin/'+this.props.tournamentid,{trigger:true});
	},


	getinvite:function(me){

	var Invite = Parse.Object.extend('Invite');
	var currentUser = Parse.User.current();
	console.log(currentUser)
	var me = this;
	var query = new Parse.Query(Invite);
	query.equalTo('UserId',window.userProfile.id);
	query.include('Team');
	query.find({
	  success: function(results) {
	  	me.setState({invites: results})
	  },
	  error: function(error) {

	  }
		});

	},
	acceptinvite:function(m){
		console.log(m)
		var me = this;
		m.get('Team').add('Players', window.userProfile);
		m.get('Team').save();
		m.destroy({
			success:function(){
				me.getinvite();
			},
		});


	},
	declineinvite:function(m){
		var me = this;
		m.destroy({
			success:function(){
				me.getinvite();
			},
		});

	},
	render: function() {
		
		var me= this
		return (
			<form onSubmit={this.TournamentList}>
				{this.state.invites.map(function(m,index){
				var TeamName = '';
				if (m.get('Team')) {
				  TeamName = m.get('Team').get('Name')

				}
                	return(
				<div>
				<div className="teaminvite">{TeamName}</div>
				<button onClick={me.acceptinvite.bind (me,m)} className="acceptinv" type="button">Accept</button>
				<button onClick={me.declineinvite.bind (me,m)} className="acceptinv" type="button">Decline</button>                
                </div>)
                })}
			</form>
		);
	}
});