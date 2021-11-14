import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { init } from "../lib/ga";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") init("G-YJNE30WHBL");
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
