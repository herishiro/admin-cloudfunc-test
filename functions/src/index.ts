import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import userFunc = require("./users")
exports.user = userFunc

admin.apps.length ? admin.app() : admin.initializeApp();

exports.addMessage = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult =
    await admin.firestore().collection('messages').add({ original: original + "!!!!" });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

exports.makeUppercase = functions.region('asia-northeast1').firestore.document('/messages/{documentId}')
  .onCreate((snap, context) => {
    const original = snap.data().original;

    functions.logger.log('Uppercasing', context.params.documentId, original);

    const uppercase = original.toUpperCase() + "????";

    return snap.ref.set({ uppercase }, { merge: true });
  });
