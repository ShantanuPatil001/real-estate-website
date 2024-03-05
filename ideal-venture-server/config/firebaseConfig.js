var admin = require("firebase-admin");

// var serviceAccount = {
//   type: process.env.ADMIN_SDK_TYPE,
//   project_id: process.env.ADMIN_SDK_PROJECT_ID,
//   private_key_id: process.env.ADMIN_SDK_PRIVATE_KEY_ID,
//   private_key: process.env.ADMIN_SDK_PRIVATE_KEY,
//   client_email: process.env.ADMIN_SDK_CLIENT_EMAILS,
//   client_id: process.env.ADMIN_SDK_CLIENT_ID,
//   auth_uri: process.env.ADMIN_SDK_AUTH_URI,
//   token_uri: process.env.ADMIN_SDK_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.ADMIN_SDK_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: process.env.ADMIN_SDK_CLIENT_X509_CERT_URL,
// };
// console.log(process.env)

var serviceAccount = require("../ideal-venture-firebase-adminsdk-d169u-793c367e5a.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

exports.bucket = admin.storage().bucket();
exports.db = admin.database();
exports.firestoreDb = admin.firestore();
exports.auth = admin.auth();