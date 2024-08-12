"use client";

import React, { useState, useEffect } from "react";
import SupplierTable from "../../components/supplier/SupplierTable";
import Layout from "../../components/layout/Layout";
import { Supplier } from "../../types/MedicineInterface";
import withAuth from "@/app/components/withAuth";

const SupplierScreen = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/api/supplier");
        if (!response.ok) throw new Error("Failed to fetch suppliers");
        const supplierData: Supplier[] = await response.json();
        if (!Array.isArray(supplierData)) {
          throw new Error("Unexpected response format for suppliers");
        }
        setSuppliers(supplierData);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleAddSupplier = async (supplier: Omit<Supplier, "id">) => {
    try {
      const response = await fetch("/api/supplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplier),
      });
      if (!response.ok) throw new Error("Failed to add supplier");
      const newSupplier: Supplier = await response.json();
      setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  const handleUpdateSupplier = async (supplier: Supplier) => {
    try {
      const response = await fetch("/api/supplier", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplier),
      });
      if (!response.ok) throw new Error("Failed to update supplier");
      const updatedSupplier: Supplier = await response.json();
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((s) =>
          s.id === updatedSupplier.id ? updatedSupplier : s
        )
      );
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  const handleDeleteSupplier = async (id: number) => {
    try {
      const response = await fetch("/api/supplier", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete supplier");
      setSuppliers((prevSuppliers) => prevSuppliers.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <Layout>
      <SupplierTable
        suppliers={suppliers}
        loading={loading}
        onAddSupplier={handleAddSupplier}
        onUpdateSupplier={handleUpdateSupplier}
        onDeleteSupplier={handleDeleteSupplier}
      />
    </Layout>
  );
};

export default withAuth(SupplierScreen);
