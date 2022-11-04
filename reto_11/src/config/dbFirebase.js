let admin = require("firebase-admin");

let serviceAccount = require("./backendproject-coderhouse-firebase-adminsdk-2sel0-7bb074b6ee.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/* console.log("Base de datos Firestore conectada!");
const dbFirestore = admin.firestore();
exports.module = dbFirestore; */
