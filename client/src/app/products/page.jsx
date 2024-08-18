"use client";
import React, { useEffect, useState } from "react";
import api from "../api";
import Modal from "../components/ModalForm";
import Swal from "sweetalert2";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";

const MainProduct = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [actionBtn, setActionBtn] = useState("");
  const [productData, setProductData] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      const sortedData = response.data.sort(
        (a, b) => a.productId - b.productId
      );
      setData(sortedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await api.delete(`/products/delete-product/${productId}`);
        Swal.fire({
          title: "Success",
          text: "Product deleted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchProducts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = () => {
    setOpenModal(true);
    setActionBtn("Create");
    setProductData(null);
  };

  const handleEdit = (productId) => {
    const productToEdit = data.find((item) => item._id === productId);

    setProductData(productToEdit);
    setActionBtn("Edit");
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setProductData(null);
  };

  const handleCreateProduct = async (inputProduct) => {
    try {
      const exists = data.some(
        (item) => item.productId === inputProduct.productId
      );

      if (exists) {
        Swal.fire({
          title: "Error",
          text: "Product ID already exists",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const res = await api.post(`/products/create-product`, inputProduct);
      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      setOpenModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };
  const handleEditProduct = async (updatedProduct) => {
    try {
      const res = await api.put(
        `/products/update-product/${updatedProduct._id}`,
        {
          productId: updatedProduct.productId,
          productName: updatedProduct.productName,
          quantity: updatedProduct.quantity,
          warehouseId: updatedProduct.warehouseId,
          warehouseName: updatedProduct.warehouseName,
          shelfName: updatedProduct.shelfName,
        }
      );
      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      setOpenModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const headers = [
    "Product ID",
    "Product Name",
    "Quantity",
    "Warehouse ID",
    "Warehouse Name",
    "Shelf Name",
    "Edit",
    "Delete",
  ];

  return (
    <div className="mt-10">
      <div className="flex items-center justify-end">
        <button
          className="flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={handleCreate}
        >
          <MdOutlineAdd className="mr-2" /> Create
        </button>
      </div>

      {openModal && (
        <Modal
          open={openModal}
          close={handleClose}
          title={`${actionBtn === "Create" ? "Create" : "Edit"} Product`}
          action={actionBtn}
          handleCreateProduct={handleCreateProduct}
          handleEditProduct={handleEditProduct}
          initialData={productData}
        />
      )}

      <table className="min-w-full divide-y divide-gray-200 mt-10">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider text-gray-800"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-center">
          {data.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.productId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.productName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.warehouseId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.warehouseName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.shelfName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                <button
                  className="text-yellow-500 hover:bg-slate-100 rounded-full"
                  onClick={() => handleEdit(item._id)}
                >
                  <MdEdit className="w-5 h-5 m-2" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                <button
                  className="text-red-500 hover:bg-slate-100 rounded-full"
                  onClick={() => handleDelete(item._id)}
                >
                  <MdDelete className="w-5 h-5 m-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainProduct;
