import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MedicineForm from "./MedicineForm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Medicine, Supplier } from "@/app/types/MedicineInterface";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface MedicineTableProps {
  medicines: Medicine[];
  suppliers: Supplier[];
  loading: boolean;
  onAddMedicine: (
    medicine: Omit<Medicine, "id" | "createdAt" | "updatedAt">
  ) => void;
  onUpdateMedicine: (medicine: Medicine) => void;
  onDeleteMedicine: (id: number) => void;
}

const MedicineTable: React.FC<MedicineTableProps> = ({
  medicines,
  suppliers,
  loading,
  onAddMedicine,
  onUpdateMedicine,
  onDeleteMedicine,
}) => {
  const [open, setOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState<Partial<Medicine>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const getSupplierNameById = (id: number) => {
    const supplier = suppliers.find((supplier) => supplier.id === id);
    return supplier ? supplier.name : "Unknown Supplier";
  };

  const exportToExcel = (
    medicines: Medicine[],
    getSupplierNameById: (id: number) => string,
    formatPrice: (price: number) => string
  ) => {
    const worksheet = XLSX.utils.json_to_sheet(
      medicines.map((med) => ({
        Name: med.name,
        Description: med.description,
        Quantity: med.quantity,
        ReorderLevel: med.reorderLevel,
        Supplier: getSupplierNameById(med.supplierId),
        Price: formatPrice(med.price),
        CreatedAt: new Date(med.createdAt).toLocaleDateString(),
        UpdatedAt: new Date(med.updatedAt).toLocaleDateString(),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Medicines");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "medicines.xlsx");
  };

  const handleOpen = (medicine?: Partial<Medicine>) => {
    setCurrentMedicine(medicine || {});
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleAddMedicine = (
    medicine: Omit<Medicine, "id" | "createdAt" | "updatedAt">
  ) => {
    onAddMedicine(medicine);
    handleClose();
  };

  const handleUpdateMedicine = (medicine: Medicine) => {
    onUpdateMedicine(medicine);
    handleClose();
  };

  const handleDeleteMedicine = (id: number) => {
    onDeleteMedicine(id);
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredMedicines.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => handleOpen()}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Medicine
        </button>
        <button
          onClick={() =>
            exportToExcel(medicines, getSupplierNameById, formatPrice)
          }
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Export to Excel
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label>Show</label>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <label>entries</label>
          </div>
          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md px-2 py-1"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white table-fixed">
            <thead>
              <tr>
                <th className="py-2 px-2 border-b w-12">No</th>
                <th className="py-2 px-4 border-b w-1/4">Name</th>
                <th className="py-2 px-4 border-b w-1/6">Quantity</th>
                <th className="py-2 px-4 border-b w-1/6">Reorder Level</th>
                <th className="py-2 px-4 border-b w-1/6">Supplier</th>
                <th className="py-2 px-4 border-b w-1/6">Price</th>
                <th className="py-2 px-4 border-b w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Skeleton />
                      </td>
                    </tr>
                  ))
                : currentItems.map((medicine, index) => (
                    <tr key={medicine.id}>
                      <td className="py-2 px-4 border-b text-center">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="py-2 px-4 border-b">{medicine.name}</td>
                      <td className="py-2 px-4 border-b text-center">
                        {medicine.quantity}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {medicine.reorderLevel}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {getSupplierNameById(medicine.supplierId)}
                      </td>
                      <td className="py-2 px-4 border-b truncate">
                        {formatPrice(medicine.price)}
                      </td>
                      <td className="py-2 px-4 border-b text-center truncate">
                        <button
                          onClick={() => handleOpen(medicine)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMedicine(medicine.id)}
                          className="text-red-500 hover:underline ml-4"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Control */}
        <div className="flex justify-between items-center mt-4">
          <span>
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredMedicines.length)} of{" "}
            {filteredMedicines.length} entries
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => handleChangePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handleChangePage(i + 1)}
                className={`px-3 py-1 mx-1 ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                } rounded hover:bg-gray-300`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handleChangePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 mx-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ duration: 0.3 }}
            >
              <MedicineForm
                onSubmit={(medicine) => {
                  if (currentMedicine?.id) {
                    handleUpdateMedicine(medicine);
                  } else {
                    handleAddMedicine(medicine);
                  }
                }}
                initialData={currentMedicine}
                onCancel={handleClose}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MedicineTable;
