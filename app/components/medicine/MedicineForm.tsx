import { Medicine, Supplier } from "@/app/types/MedicineInterface";
import React, { useState, useEffect } from "react";

interface MedicineFormProps {
  onSubmit: (medicine: Medicine) => void;
  onCancel: () => void;
  initialData?: Partial<Medicine>;
}

const MedicineForm: React.FC<MedicineFormProps> = ({
  onSubmit,
  onCancel,
  initialData = {},
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [price, setPrice] = useState(initialData.price || 0);
  const [quantity, setQuantity] = useState(initialData.quantity || 0);
  const [minStock, setMinStock] = useState(initialData.minStock || 0);
  const [reorderLevel, setReorderLevel] = useState(
    initialData.reorderLevel || 0
  );
  const [supplierId, setSupplierId] = useState(
    initialData.supplierId?.toString() || ""
  );
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>(
    []
  );

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    price?: string;
    quantity?: string;
    minStock?: string;
    reorderLevel?: string;
    supplierId?: string;
  }>({});

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/api/supplier");
        const data: Supplier[] = await response.json();
        console.log("Fetched suppliers:", data); // Debug log
        if (Array.isArray(data)) {
          setSuppliers(data);
        } else {
          console.error("Data from API is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleNumberChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue =
        parseFloat(e.target.value.replace(/[^0-9]/g, "")) || 0;
      setter(formattedValue);
    };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!name) newErrors.name = "Name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (price <= 0) newErrors.price = "Price must be greater than 0.";
    if (quantity < 0) newErrors.quantity = "Quantity cannot be negative.";
    if (minStock < 0) newErrors.minStock = "Minimum Stock cannot be negative.";
    if (reorderLevel < 0)
      newErrors.reorderLevel = "Reorder Level cannot be negative.";
    if (!supplierId) newErrors.supplierId = "Supplier is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        id: initialData.id || 0,
        name,
        description,
        price,
        quantity,
        minStock,
        reorderLevel,
        supplierId: parseInt(supplierId), // Ensure supplierId is a number
        createdAt: initialData.createdAt || new Date(),
        updatedAt: new Date(),
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {initialData.id ? "Update Medicine" : "Add Medicine"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="flex flex-col col-span-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700">Price (Rp)</label>
            <input
              type="text"
              value={price.toLocaleString("id-ID")}
              onChange={handleNumberChange(setPrice)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="text"
              value={quantity.toLocaleString("id-ID")}
              onChange={handleNumberChange(setQuantity)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700">Minimum Stock</label>
            <input
              type="text"
              value={minStock.toLocaleString("id-ID")}
              onChange={handleNumberChange(setMinStock)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.minStock && (
              <p className="text-red-500 text-sm">{errors.minStock}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700">Reorder Level</label>
            <input
              type="text"
              value={reorderLevel.toLocaleString("id-ID")}
              onChange={handleNumberChange(setReorderLevel)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.reorderLevel && (
              <p className="text-red-500 text-sm">{errors.reorderLevel}</p>
            )}
          </div>
          <div className="flex flex-col col-span-2">
            <label className="block text-gray-700">Supplier</label>
            <select
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a supplier</option>
              {Array.isArray(suppliers) &&
                suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id.toString()}>
                    {supplier.name}
                  </option>
                ))}
            </select>

            {errors.supplierId && (
              <p className="text-red-500 text-sm">{errors.supplierId}</p>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicineForm;
