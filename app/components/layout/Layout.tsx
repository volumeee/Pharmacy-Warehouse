import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-grow p-8 bg-gray-100 overflow-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
