import React, { useState } from "react";
import { Medicine } from "@prisma/client";
import MedicineForm from "./MedicineForm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface MedicineTableProps {
  medicines: Medicine[];
  loading: boolean;
  onAddMedicine: (
    medicine: Omit<Medicine, "id" | "createdAt" | "updatedAt">
  ) => void;
  onUpdateMedicine: (medicine: Medicine) => void;
  onDeleteMedicine: (id: number) => void;
}

const MedicineTable: React.FC<MedicineTableProps> = ({
  medicines,
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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <button
        onClick={() => handleOpen()}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Drug
      </button>
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
                <th className="py-2 px-4 border-b w-1/2">Description</th>
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
                    </tr>
                  ))
                : currentItems.map((medicine, index) => (
                    <tr key={medicine.id}>
                      <td className="py-2 px-4 border-b text-center">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {truncateText(medicine.name, 20)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {truncateText(medicine.description || "N/A", 30)}
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

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <MedicineForm
              onSubmit={(medicine) => {
                if (currentMedicine?.id) {
                  handleUpdateMedicine({
                    ...medicine,
                    description: medicine.description || "",
                  });
                } else {
                  handleAddMedicine({
                    ...medicine,
                    description: medicine.description || "",
                  });
                }
              }}
              initialData={currentMedicine}
              onCancel={handleClose}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MedicineTable;
