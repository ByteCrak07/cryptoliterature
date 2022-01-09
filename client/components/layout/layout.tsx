import { ReactNode, FC } from "react";
import Toast from "../general/toast";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />

      {children}

      <Footer />

      <Toast />
    </>
  );
};

export default Layout;
