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
    <div className="container">
    <form onSubmit={this.LogInSubmitted}>
		<div className="logincontainerthree logincolum1"></div>
		<div className="logincontainer logincolum">
				<input className="emailtext form-control" ref="emailText" type="text" placeholder="Username" />
				<input className="passwordtext form-control" ref="passwordText" type="password" placeholder="Password" />
				<button className="btnsubmit btn btn-default" ref="btnsubmit" type="submit">Submit</button>
				<button  onClick={this.GoToSignUp} className="btnsignup btn btn-default" ref="signup" type="button">Sign Up</button>
				<div style={divStyle} ref="error">{this.state.message}</div>
			
		</div>
		<div className="logincontainerfour logincolum1"></div>
	</form>
	</div>
	)},

	GoToSignUp:function(){
		myRouter.navigate('/signup',{trigger:true});
	},



}); 