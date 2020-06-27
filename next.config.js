// Load env variables automatically (from next secrets or env)
require('dotenv').config();

const withPWA = require('next-pwa');

const getSecret = (key) => {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`ERROR: ${key} is not set.`);
  }

  return process.env[key];
};

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    API_KEY: getSecret('API_KEY'),
    AUTH_DOMAIN: getSecret('AUTH_DOMAIN'),
    DATABASE_URL: getSecret('DATABASE_URL'),
    PROJECT_ID: getSecret('PROJECT_ID'),
    STORAGE_BUCKET: getSecret('STORAGE_BUCKET'),
    MESSAGING_SENDER_ID: getSecret('MESSAGING_SENDER_ID'),
    APP_ID: getSecret('APP_ID'),
  },
});
