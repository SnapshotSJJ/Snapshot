import React from 'react';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emailInput: '',
			passwordInput: ''
		};
		firebase.initialize(config);
	}

	handleEmailInput (e) {
		this.setState({ emailInput: e.target.value });
	}

	handlePasswordInput (e) {
		this.setState({ passwordInput: e.target.value });
	}

	createNewUser () {
		let email = this.state.emailInput;
		let password = this.state.passwordInput;
		firebase.auth().createUserWithEmailAndPassword(email, password).catch( (error) => {
			let errorCode = error.code;
			let errorMessage = error.message;
			if (errorCode = 'auth/weak-password') {
				alert('Password too weak');
			} else {
				alert(errorMessage);
			}
			console.log(error);
		});
	}

	

	signOut () {
		firebase.auth().signOut().then( () => {
			console.log('sign-out successful');
		}).catch( (error) => {
			console.log(error);
		});
	}

	render () {
		return (
			<input type="text" value={this.state.email} onChange={this.handleEmailInput.bind(this)}/>
      <input type="text" value={this.state.password} onChange={this.handlePasswordInput.bind(this)}/>
      <button onClick={this.createNewUser.bind(this)}>create user</button>
      <button onClick={this.signOut.bind(this)}>sign out</button>
		);
	}
}

export default Login;
}