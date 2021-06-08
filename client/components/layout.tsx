import Head from "next/head";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>

      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
