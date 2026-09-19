import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import type { ReactNode } from "react";

function Layout({
  children,
  handleLogout,
}: {
  children: ReactNode;
  handleLogout?: () => void;
}) {
  return (
    <>
      <Navbar />
      <Sidebar handleLogout={handleLogout ?? (() => {})} />

      <main className="main-content">
        {children}
      </main>
    </>
  );
}

export default Layout;