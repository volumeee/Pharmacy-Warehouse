import React, { useState, useEffect } from "react";
import { Supplier } from "@/app/types/MedicineInterface";

interface SupplierFormProps {
  onSubmit: (supplier: Partial<Supplier>) => void;
  onCancel: () => void;
  initialData?: Partial<Supplier>;
}

const SupplierForm: React.FC<SupplierFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [supplierData, setSupplierData] = useState<Partial<Supplier>>({
    name: "",
    contactInfo: "",
    terms: "",
    ...initialData, // Pre-fill the form if editing an existing supplier
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSupplierData({
      ...supplierData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(supplierData); // Pass the supplier data to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={supplierData.name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contact Info
        </label>
        <textarea
          name="contactInfo"
          value={supplierData.contactInfo}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Terms
        </label>
        <input
          type="text"
          name="terms"
          value={supplierData.terms}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SupplierForm;
