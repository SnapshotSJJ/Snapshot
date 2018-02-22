import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA9uss6PuP-aC6YGLDfpezE_iEQLpnjmfk",
  authDomain: "hrla20-greenfield.firebaseapp.com",
  databaseURL: "https://hrla20-greenfield.firebaseio.com",
  projectId: "hrla20-greenfield",
  storageBucket: "hrla20-greenfield.appspot.com",
  messagingSenderId: "589901781908"
};

const uiConfig = {
	//signInFlow: 'popup',
	signInOptions: [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
  	signInSuccess: () => false
  }
};

export {
	config,
	uiConfig
};