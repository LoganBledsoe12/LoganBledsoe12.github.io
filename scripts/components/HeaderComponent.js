var React = require('react');
var _ = require('backbone/node_modules/underscore');
var validator = require ('validator')

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
	
	componentDidMount:function(){
		gettournament(this);
		var me = this;
		this.gettournaments(this);
		window.events.userchanged = function(){
			var currentUser = Parse.User.current();
			me.setState({username:currentUser.get('username')})
		}
	},
	GoToSignUp:function(){
		myRouter.navigate('/signup',{trigger:true});
	},
	getInitialState:function(){
		return{tournaments:[], username: '',profile: new Parse.Object('UserProfile')};
	},
	tournamentjoin: function(){
		myRouter.navigate('/tournamentjoin/'+this.props.tournamentid,{trigger:true});
	},
	LogInSubmitted: function(e) {
		e.preventDefault();
		var errormessage = ''
		var emailText= this.refs.emailText.getDOMNode().value
		var passwordText= this.refs.passwordText.getDOMNode().value

		if (emailText.length == 0){
			errormessage = 'Please enter an email address'
		}
		if (passwordText.length == 0){
			errormessage = 'Please enter a password'
		}
		if (!validator.isEmail(emailText)){
			errormessage = 'email looks wrong'
		}
		
		this.setState({message: errormessage})
		var self = this;
		Parse.User.logIn(
		emailText, passwordText,		
		{
	    success: function(userModel) {
	        console.log('user was logged in');
	        myRouter.navigate('',{trigger:true});
	        console.log(userModel)
	        window.events.userchanged();
	        self.getprofile(self);
	    },
	    error: function(userModel, response) {
	        console.log('user was not logged in', response.responseJSON);
	        self.setState({message: response.message})
	    }
		})
	},

	getprofile:function(me){

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
},

	gettournaments: function (){
	var Tournament = Parse.Object.extend('Tournament');
	var me = this
	var query = new Parse.Query(Tournament);
	query.find({
	  success: function(results) {
	  	me.setState({
	  		
	  		tournaments:results
	  	})
	  },
	  error: function(error) {

	  }
	});
},


	render: function() {
		var loginButton;
		if (this.state.username) {
		  loginButton = this.state.username
		} else {
		  loginButton = 'Sign In'
		}
		var signinhtml;
		if (this.state.username) {
		  signinhtml =<div></div>
		} else {
		  signinhtml = 
		<form onSubmit={this.LogInSubmitted}>
			<div className="logincontainerthree logincolum1"></div>
			<div className="logincontainer logincolum">
					<input className="emailtext form-control" ref="emailText" type="text" placeholder="Username" />
					<input className="passwordtext form-control" ref="passwordText" type="password" placeholder="Password" />
					<button className="btnsubmit btn btn-default" ref="btnsubmit" type="submit">Submit</button>
					<button  onClick={this.GoToSignUp} className="btnsignup btn btn-default" ref="signup" type="button">Sign Up</button>
					<div ref="error">{this.state.message}</div>
				
			</div>
			<div className="logincontainerfour logincolum1"></div>
		</form>
		}
		
		return (				
				<nav className="navbar navbar-default">
  <div className="container-fluid">

    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">hola</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#"></a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{loginButton} <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li>
             {signinhtml}
            </li>
            <li><a href="#">Team Invites</a></li>
            <li><a href="#profile">My Profile</a></li>
            <li><a href="#">Sign Out</a></li>

          </ul>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li className="tournaments"><a href="#/tournament">Support</a></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle support" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tournament <span class="caret"></span></a>
          <ul className="dropdown-menu">
     			{this.state.tournaments.map(function(m,index){
                	return <li><a href={"#/tournamentinfo/" + m.id}>{m.get('Name')}</a></li>
                })}
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>		
		);
	}
});