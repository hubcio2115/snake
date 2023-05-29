import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  /*
   * Specify what prefix the client-side variables must have.
   * This is enforced both on type-level and at runtime.
   */
  clientPrefix: 'VITE_',
  server: {},
  client: {
    VITE_API_KEY: z.string(),
    VITE_AUTH_DOMAIN: z.string(),
    VITE_DATABASE_URL: z.string().url(),
    VITE_PROJECT_ID: z.string(),
    VITE_STORAGE_BUCKET: z.string(),
    VITE_MESSAGING_SENDER_ID: z.string(),
    VITE_APP_ID: z.string(),
  },
  /**
   * What object holds the environment variables at runtime.
   * Often `process.env` or `import.meta.env`
   */
  runtimeEnv: import.meta.env,
});
