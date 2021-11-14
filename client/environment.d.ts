declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SITE_URL: string;
      GHOST_URL: string;
      GHOST_CONTENT_API_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
