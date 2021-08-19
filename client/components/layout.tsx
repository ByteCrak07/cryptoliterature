import type { NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
