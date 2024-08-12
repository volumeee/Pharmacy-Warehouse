"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MedicineScreen from "./pages/medicine/page";
import DashboardScreen from "./pages/page";
import SupplierScreen from "./pages/supplier/page";

const HomePage = () => {
  const pathname = usePathname();

  const renderScreen = () => {
    switch (pathname) {
      case "/":
        return <DashboardScreen />;
      case "/pages/medicine":
        return <MedicineScreen />;
      case "/pages/supplier":
        return <SupplierScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return renderScreen();
};

export default HomePage;
