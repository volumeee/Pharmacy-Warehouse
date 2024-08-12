"use client";

import React, { useState, useEffect } from "react";
import MedicineTable from "./components/medicine/MedicineTable";
import Layout from "./components/layout/Layout";
import { Medicine } from "./types/MedicineInterface";

const HomePage = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/medicine")
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data); // Temporarily remove any mapping or transformation
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

export default HomePage;
