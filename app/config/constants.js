import firebase from 'firebase'

export const maxInvestmentSizePreference = 10000000000


const config = {
  apiKey: "AIzaSyDzhpfgvdvSSxZZLl0SwI7URD1zrzuj8I0",
  authDomain: "reduckr.firebaseapp.com",
  databaseURL: "https://reduckr.firebaseio.com",
  storageBucket: "reduckr.appspot.com",
  messagingSenderId: "556703023030"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000
export const repliesExpirationLength = 300000
