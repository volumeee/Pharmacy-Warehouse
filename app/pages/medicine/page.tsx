"use client";

import React, { useState, useEffect } from "react";
import MedicineTable from "../../components/medicine/MedicineTable";
import Layout from "../../components/layout/Layout";
import { Medicine, Supplier } from "../../types/MedicineInterface";

const MedicineScreen = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("/api/medicine");
        if (!response.ok) throw new Error("Failed to fetch medicines");
        const medicineData: Medicine[] = await response.json();
        setMedicines(medicineData);

        const supplierIds = Array.from(
          new Set(medicineData.map((med) => med.supplierId).filter((id) => id))
        );

        if (supplierIds.length > 0) {
          fetchSuppliers(supplierIds);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
        setLoading(false);
      }
    };

    const fetchSuppliers = async (supplierIds: number[]) => {
      try {
        const response = await fetch("/api/supplier");
        if (!response.ok) throw new Error("Failed to fetch suppliers");
        const supplierData: Supplier[] = await response.json();
        if (!Array.isArray(supplierData)) {
          throw new Error("Unexpected response format for suppliers");
        }

        const filteredSuppliers = supplierData.filter((supplier) =>
          supplierIds.includes(supplier.id)
        );
        setSuppliers(filteredSuppliers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const addMedicine = (
    newMedicine: Omit<Medicine, "id" | "createdAt" | "updatedAt">
  ) => {
    fetch("/api/medicine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMedicine),
    })
      .then((response) => response.json())
      .then((data) => setMedicines((prev) => [...prev, data]));
  };

  const updateMedicine = (updatedMedicine: Medicine) => {
    fetch("/api/medicine", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMedicine),
    })
      .then((response) => response.json())
      .then((data) => {
        setMedicines((prev) =>
          prev.map((medicine) => (medicine.id === data.id ? data : medicine))
        );
      });
  };

  const deleteMedicine = (id: number) => {
    fetch("/api/medicine", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      setMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
    });
  };

  return (
    <Layout>
      <MedicineTable
        medicines={medicines}
        suppliers={suppliers}
        loading={loading}
        onAddMedicine={(medicine) =>
          addMedicine(
            medicine as Omit<Medicine, "id" | "createdAt" | "updatedAt">
          )
        }
        onUpdateMedicine={(medicine) => updateMedicine(medicine as Medicine)}
        onDeleteMedicine={deleteMedicine}
      />
    </Layout>
  );
};

export default MedicineScreen;
