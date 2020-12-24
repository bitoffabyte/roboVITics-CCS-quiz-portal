import firebase from 'firebase/app';
import 'firebase/auth';
export const initialize = () => {
	if (!firebase.apps.length) {
		firebase.initializeApp({
			apiKey: 'AIzaSyALvNNpA2AlvxHyNEIpPdQWuVeZeHvqRVo',
			authDomain: 'ccs-robo.firebaseapp.com',
			databaseURL: 'https://ccs-robo.firebaseio.com',
			projectId: 'ccs-robo',
			storageBucket: 'ccs-robo.appspot.com',
			messagingSenderId: '1003390848111',
			appId: '1:1003390848111:web:3510e907a39215e946d19a',
			measurementId: 'G-P7T76KVSWW',
		});
	} else {
		firebase.app(); // if already initialized, use that one
	}
};

export const signIn = async () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	provider.setCustomParameters({
		prompt: 'select_account',
	});

	// firebase.auth().signOut();
	try {
		const result = await firebase.auth().signInWithPopup(provider);
		// var user = result.user;
	} catch (error) {
		//console.log(error);
		// var errorCode = error.code;
		// var errorMessage = error.message;
		// var email = error.email;
		// var credential = error.credential;
	}
};
