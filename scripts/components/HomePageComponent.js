var React = require('react');
var _ = require('backbone/node_modules/underscore');

module.exports = React.createClass({
	
	componentDidMount:function(){
	},
	
	tournamentjoin: function(){
		myRouter.navigate('/tournamentjoin/'+this.props.tournamentid,{trigger:true});
	},
	render: function() {
		
		
		return (
			<h1>HOME PAGE</h1>
		);
	}
});