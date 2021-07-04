import admin from 'firebase-admin';

const initializeApp = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    }),
    databaseURL: "https://test-admin-cloudfunc.firebaseio.com"
  });
};

admin.apps.length ? admin.app() : initializeApp();

export const firestore = admin.firestore();