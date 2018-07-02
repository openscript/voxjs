import firebase from 'firebase/app';
import { h, render } from 'preact';
import { firebaseConfig } from './config';
import { App } from './containers/app';

// initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize voxjs
const parent = document.getElementById('voxjs');
if (parent) {
    render(<App />, parent);
}
