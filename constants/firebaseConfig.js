import getConfig from 'next/config';

export default {
  apiKey: getConfig().publicRuntimeConfig.API_KEY,
  authDomain: getConfig().publicRuntimeConfig.AUTH_DOMAIN,
  databaseURL: getConfig().publicRuntimeConfig.DATABE_URL,
  projectId: getConfig().publicRuntimeConfig.PROJECT_ID,
  storageBucket: getConfig().publicRuntimeConfig.STORAGE_BUCKET,
  messagingSenderId: getConfig().publicRuntimeConfig.MESSAGING_SENDER_ID,
  appId: getConfig().publicRuntimeConfig.APP_ID,
};
