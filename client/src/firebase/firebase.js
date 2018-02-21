import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA9uss6PuP-aC6YGLDfpezE_iEQLpnjmfk",
  authDomain: "hrla20-greenfield.firebaseapp.com",
  databaseURL: "https://hrla20-greenfield.firebaseio.com",
  projectId: "hrla20-greenfield",
  storageBucket: "hrla20-greenfield.appspot.com",
  messagingSenderId: "589901781908"
};

// if (!firebase.apps.length) {
// 	firebase.initializeApp(config);
// }

// let initialize = firebase.initializeApp(config);

// let createUser = firebase.auth().createUserWithEmailAndPassword(email, password).catch( (error) => {
// 	if (error) {
// 		console.log(error);
// 	}
// });

// let signIn = firebase.auth().signInWithEmailAndPassword(email, password).catch( (error) => {
// 	if (error) {
// 		console.log(error);
// 	}
// });

// let signOut = firebase.auth().signOut.then( () => {
// 	console.log('sign out successful');
// }).catch( (error) => {
// 	console.log(error);
// });

// const auth = firebase.auth();



export {
	// initialize,
	// createUser,
	// signIn,
	// signOut,
	// auth,
	config,
};