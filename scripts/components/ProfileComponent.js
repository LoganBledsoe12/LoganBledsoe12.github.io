var React = require('react');
var validator = require ('validator')
var UserProfile = require ('../models/UserProfileModel.js')
var PayPal = require ('./PayPalComponent.js')
function getprofile(me){

	var UserProfile = Parse.Object.extend('UserProfile');
	var currentUser = Parse.User.current();
	console.log(currentUser)
	var query = new Parse.Query(UserProfile);
	query.equalTo('Username',currentUser.attributes.username);
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
}
function gettournaments(e){
	var Tournament = Parse.Object.extend('Tournament');
	var query = new Parse.Query(Tournament);
	query.find({
	  success: function(results) {
	  	e.setState({
	  		
	  		tournaments:results
	  	})
	  },
	  error: function(error) {

	  }
	});
}
module.exports = React.createClass({
	getInitialState:function(){
		
		return{tournaments:[], username: '',profile: new Parse.Object('UserProfile')};
	},
	componentDidMount:function(){
		getprofile(this);
		gettournaments(this);
	},
	change: function(e){
		myRouter.navigate('/tournamentinfo/'+e.target.value,{trigger:true});
	},
	render: function() {
	
		return (
    <div>
    <form onSubmit={this.userSubmitted}>
	<div className="profileviews"> <span>Profile Views:</span><span ref="profileviews"> {this.state.profile.get('ProfileViews')}</span> </div>
		<span>Tournaments: </span>
		<select className="form-control" name="Tournaments" onChange={this.change}>
			<option className="optnone">Select Tournament</option>
                {this.state.tournaments.map(function(m,index){
                	return <option value= {m.id} className="trnylist">{m.get('Name')}</option>
                })}
        </select><br/>
    <button className="support">Support</button>
    <div className="money">Bank: ${this.state.profile.get('Money')}</div>		
	</form>
	<PayPal/>
	</div>
	)},
}); 

