import { ReactNode, FC } from "react";
import WalletAuthWrapper from "../../contexts/walletAuthWrapper";
import Toast from "../general/toast";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <WalletAuthWrapper>
      <Header />

      {children}

      <Footer />

      <Toast />
    </WalletAuthWrapper>
  );
};

export default Layout;
