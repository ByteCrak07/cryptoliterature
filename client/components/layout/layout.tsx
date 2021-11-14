import { ReactNode, FC } from "react";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />

      <main className="pt-24 md:pt-28 px-7 md:px-10 lg:px-20 text-lit-dark">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
