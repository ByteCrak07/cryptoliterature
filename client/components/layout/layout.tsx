import Head from "next/head";
import { ReactNode, FC } from "react";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />

        <meta
          name="google-site-verification"
          content="v2X5NCqgwnt0j6GlKi2u1pgwrHRtIPOs6ktJgbwR6fs"
        />
      </Head>

      <Header />

      <main className="pt-24 md:pt-28 px-7 md:px-10 lg:px-20 text-lit-dark">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
