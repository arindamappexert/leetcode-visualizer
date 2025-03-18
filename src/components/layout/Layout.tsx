import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SimpleFooter from "./SimpleFooter";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <SimpleFooter />
    </div>
  );
};

export default Layout;
