var React = require('react');
var validator = require ('validator')



module.exports = React.createClass({
	getInitialState:function(){
		return{message: ''};
	},
	render: function() {
		var divStyle={
		color:'red'
	}
		return (
    <form onSubmit={this.userSubmitted}>
		<input className="usertext" ref="usertext" type="text" placeholder="Username" />
		<input className="emailtext" ref="emailText" type="text" placeholder="Email" />
		<input className="gamertagtext" ref="gamertagtext" type="text" placeholder="Gamertag" />

		<input className="passwordtext" ref="passwordText" type="password" placeholder="Password" />
		<input className="confirmpass" ref="confirmtext" type="password" placeholder="Confirm Password" />
		<button className="btnsubmit" ref="btnsubmit" type="submit">Submit</button>
		<div style={divStyle} ref="error">{this.state.message}</div>
	</form>
	)},
	userSubmitted: function(e) {
		e.preventDefault();
		var errormessage = ''
		var emailText= this.refs.emailText.getDOMNode().value
		var passwordText= this.refs.passwordText.getDOMNode().value
		var confirmtext= this.refs.confirmtext.getDOMNode().value
		var gamertagtext= this.refs.gamertagtext.getDOMNode().value
		var usertext= this.refs.usertext.getDOMNode().value

		if (emailText.length == 0){
			errormessage = 'Please enter an email address'
		}
		if (passwordText.length == 0){
			errormessage = 'Please enter a password'
		}
		if (confirmtext.length == 0){
			errormessage = 'Please confirm your password'
		}
		if (passwordText !== confirmtext){
			errormessage = 'Your passwords do not match'
		}
		if (!validator.isEmail(emailText)){
			errormessage = 'email looks wrong'
		}
		if (usertext.length == 0){
			errormessage = 'Please enter a valid Username'
		}
		if (gamertagtext.length == 0){
			errormessage = 'Please enter a valid Gamertag'
		}
		if (errormessage){
			this.setState({message: errormessage})
			return
		}
		
		var user = new Parse.User();
		var self = this;
		user.signUp({
	    username: usertext,
	    password: passwordText
		}, 		{
	    success: function(user) {
	        console.log('user was logged in');
	        newUserProfile(emailText);
	    },
	    error: function(userModel, response) {
	        console.log('user was not logged in', response.responseJSON);
	        self.setState({message: response.message})
	    }
		})
	}	
}); 

function newUserProfile(username){
	var UserProfile = Parse.Object.extend("UserProfile");
	var UP = new UserProfile();

	UP.set("Username",username );
	UP.set('ProfileViews',0);
	UP.set('CreditBalance',0);
	UP.set('TrophyCount',0);
	UP.set('Money',0);



	UP.save(null, {
	  success: function() {
		window.events.userchanged();
		myRouter.navigate('',{trigger:true});
	  },
	  error: function() {
	  
  }
});
}