/* eslint-disable linebreak-style */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


admin.apps.length ? admin.app() : admin.initializeApp();

exports.deleteUserInfo = functions.auth.user().onDelete((user) => {
  try {
    const db = admin.firestore()
    return db.collection('users').doc(user.uid).delete()
  } catch (error) {
    throw new Error(error);
  }
});

exports.createUserInfo = functions.auth.user().onCreate((user) => {
  try {
    const db = admin.firestore()
    console.log("user.uid", user.uid)
    const userDoc = db.collection('users').doc(user.uid)
    return userDoc.set({ createdAt: new Date() })
  } catch (error) {
    throw new Error(error);
  }
});

exports.createUser = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  try {
    const userRecord = await admin
      .auth()
      .createUser({
        email: 'user@example.com',
        emailVerified: false,
        phoneNumber: '+11234567890',
        password: 'secretPassword',
        displayName: 'John Doe',
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false,
      })
    res.json({ result: `Successfully created new user: ${userRecord.uid}` });
  } catch (error) {
    res.json({ result: `Error creating new user: ${error}` });
  }
});

exports.deleteUser = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  const { uid } = req.body
  if (!uid) res.json({ result: `there is no user with uid: ${uid}` });
  try {
    await admin.auth().deleteUser(uid)
    console.log('Successfully deleted user');
    res.end()
  } catch (error) {
    console.log('Error deleting user:', error);
    res.end()
  }
});
