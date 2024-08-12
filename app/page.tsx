"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import MedicineScreen from "./pages/medicine/page";
import DashboardScreen from "./pages/page";
import SupplierScreen from "./pages/supplier/page";

const HomePage = () => {
  const pathname = usePathname();

  const renderScreen = () => {
    switch (pathname) {
      case "/":
        return <DashboardScreen />;
      case "/medicine":
        return <MedicineScreen />;
      case "/supplier":
        return <SupplierScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return renderScreen();
};

export default HomePage;
