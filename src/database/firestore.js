const firebaseConfig = require("../firebase.json");
const admin = require("firebase-admin");

admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) });
const db = admin.firestore();

module.exports = db;
