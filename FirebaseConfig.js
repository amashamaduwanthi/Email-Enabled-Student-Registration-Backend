const admin = require("firebase-admin");
const serviceAccount = require("./student-registration-41199-firebase-adminsdk-fbsvc-2bbe8fb7e2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://student-registration-41199.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;
