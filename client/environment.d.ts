import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }

  namespace NodeJS {
    interface ProcessEnv {
      SITE_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_CLIENT_AUTH_KEY: string;
      GHOST_URL: string;
      GHOST_CONTENT_API_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
