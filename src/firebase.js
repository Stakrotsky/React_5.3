import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyCwpm_Edd33TvEyysJuHl5ZDvv4iN9yJrQ',
	authDomain: 'react-5-3.firebaseapp.com',
	projectId: 'react-5-3',
	storageBucket: 'react-5-3.appspot.com',
	messagingSenderId: '539710468194',
	appId: '1:539710468194:web:953e3126fe023efa30613b',
	databaseURL: 'https://react-5-3-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
