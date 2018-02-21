import { auth } from './firebase';

//Sign up
export const createUserWithEmailAndPassword = (email, password) => {
	auth.signInWithEmailAndPassword(email, password);
};

export const signInWithEmailAndPassword = (email, password) => {
	auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
	auth.signOut();
};

export const resetPassword = (email) => {
	auth.sendPasswordResetEmail(email);	
}

export const updatePassword = (password) => {
	auth.currentUser.updatePassword(password);
};

