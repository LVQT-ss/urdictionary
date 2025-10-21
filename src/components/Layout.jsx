import { Outlet } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

function Layout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
