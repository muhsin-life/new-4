import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex-grow flex-1">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
