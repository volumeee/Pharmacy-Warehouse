import { Medicine } from "@/app/types/MedicineInterface";
import React, { useState, useEffect } from "react";

interface MedicineFormProps {
  onSubmit: (medicine: Medicine) => void;
  onCancel: () => void;
  initialData?: Partial<Medicine>;
}

const MedicineForm: React.FC<MedicineFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState(initialData?.price || 0);
  const [quantity, setQuantity] = useState(initialData?.quantity || 0);
  const [minStock, setMinStock] = useState(initialData?.minStock || 0);
  const [reorderLevel, setReorderLevel] = useState(
    initialData?.reorderLevel || 0
  );
  const [supplierId, setSupplierId] = useState(initialData?.supplierId || 0);
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>(
    []
  );
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price || 0);
      setQuantity(initialData.quantity || 0);
      setMinStock(initialData.minStock || 0);
      setReorderLevel(initialData.reorderLevel || 0);
      setSupplierId(initialData.supplierId || 0);
    }
  }, [initialData]);

  useEffect(() => {
    // Fetch suppliers when the component mounts
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/api/suppliers");
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    // Validate form
    if (
      name &&
      description &&
      price > 0 &&
      quantity >= 0 &&
      minStock >= 0 &&
      reorderLevel >= 0 &&
      supplierId > 0
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name, description, price, quantity, minStock, reorderLevel, supplierId]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPrice = parseFloat(e.target.value.replace(/[^0-9]/g, ""));
    setPrice(formattedPrice);
  };

  const handleNumberChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value) || 0;
      setter(value);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    onSubmit({
      id: initialData?.id || 0,
      name,
      description,
      price,
      quantity,
      minStock,
      reorderLevel,
      supplierId,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
    });
  };

  return (
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
            required
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-gray-700">Price (Rp)</label>
          <input
            type="text"
            value={price.toLocaleString("id-ID")}
            onChange={handlePriceChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={handleNumberChange(setQuantity)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-gray-700">Minimum Stock</label>
          <input
            type="number"
            value={minStock}
            onChange={handleNumberChange(setMinStock)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-gray-700">Reorder Level</label>
          <input
            type="number"
            value={reorderLevel}
            onChange={handleNumberChange(setReorderLevel)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label className="block text-gray-700">Supplier</label>
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(parseInt(e.target.value))}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
            isFormValid ? "" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
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
  );
};

export default MedicineForm;
