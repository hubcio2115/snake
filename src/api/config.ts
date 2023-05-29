import { env } from 'env';

const firebaseConfig = {
  apiKey: env.VITE_API_KEY,
  authDomain: env.VITE_AUTH_DOMAIN,
  databaseURL: env.VITE_DATABASE_URL,
  projectId: env.VITE_PROJECT_ID,
  storageBucket: env.VITE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
  appId: env.VITE_API_KEY,
  measurementId: env.VITE_MESSAGING_SENDER_ID,
};

export default firebaseConfig;
