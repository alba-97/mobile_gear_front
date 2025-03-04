import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-grow w-full px-4 py-8 bg-gray-100 shadow-2xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
