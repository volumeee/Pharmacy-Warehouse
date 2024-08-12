"use client";

import React from "react";
import Layout from "../components/layout/Layout";
import withAuth from "../components/withAuth";

const DashboardScreen = () => {
  return (
    <Layout>
      <div>Hello World</div>
    </Layout>
  );
};

export default withAuth(DashboardScreen);
