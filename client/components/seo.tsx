import type { NextPage } from "next";
import Head from "next/head";

interface LayoutProps {
  title: string;
  description: string;
}

const Seo: NextPage<LayoutProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default Seo;
