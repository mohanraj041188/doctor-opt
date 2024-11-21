import { useLocation } from "@remix-run/react";

import HeaderComponent from "./navigations/header/HeaderComponent";
import InnerHeader from "./navigations/header/InnerHeader";
import Footer from "./navigations/footer/footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const isInnerPage = location.pathname !== "/";

  return (
    <div>
      <header>
        {isInnerPage ? (
          <>
            <InnerHeader />
          </>
        ) : (
          <HeaderComponent />
        )}
      </header>
      <div className="layout">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
