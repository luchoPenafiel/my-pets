import * as admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../../vetapp-a5879-firebase-adminsdk-lh1jg-8085eec7d0.json');

export default async (req, res) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://vetapp-a5879.firebaseio.com',
    });
  }

  try {
    const { token } = JSON.parse(req.headers.authorization || '{}');
    if (!token) {
      return res.status(403).json({
        error: true,
        errorCode: 403,
        message: 'Auth token missing.',
      });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);

    return res.status(200).json(decodedToken);
  } catch (err) {
    return res.status(400).json({ error: err, message: 'Auth token invalid' });
  }
};
