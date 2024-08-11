"use client";

import React, { useState, useEffect } from "react";
import MedicineTable from "./components/medicine/MedicineTable";
import Layout from "./components/layout/Layout";
import { Medicine } from "@prisma/client";

const HomePage = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/medicine")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Add this line to check the structure of the data
        const formattedData = Array.isArray(data)
          ? data.map((item: any) => ({
              ...item,
              description: item.description ?? null,
            }))
          : []; // Handle case where data is not an array
        setMedicines(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
        setLoading(false);
      });
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
        loading={loading}
        onAddMedicine={addMedicine}
        onUpdateMedicine={updateMedicine}
        onDeleteMedicine={deleteMedicine}
      />
    </Layout>
  );
};

export default HomePage;
