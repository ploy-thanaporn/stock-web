"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

export default function ModalFrom({
  open,
  close,
  title,
  action,
  handleCreateProduct,
  handleEditProduct,
  initialData,
}) {
  const [inputProduct, setInputProduct] = useState({
    productId: "",
    productName: "",
    quantity: "",
    warehouseId: "",
    warehouseName: "",
    shelfName: "",
  });

  useEffect(() => {
    if (action === "Edit" && initialData) {
      setInputProduct(initialData);
    }
  }, [action, initialData]);

  const onChange = (e) => {
    setInputProduct({ ...inputProduct, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (action === "Create") {
      await handleCreateProduct(inputProduct);
    } else if (action === "Edit") {
      await handleEditProduct(inputProduct);
    }
  };
  return (
    <Dialog open={open} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[650px]">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <DialogTitle
                as="h3"
                className="text-lg font-semibold leading-6 text-gray-900"
              >
                {title}
              </DialogTitle>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-xl text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={close}
              >
                <IoIosClose className="w-8 h-8" />
              </button>
            </div>

            <form onSubmit={onSubmitForm}>
              <div className="grid gap-4 mb-4 grid-cols-2 p-4 md:p-5 ">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="productId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Id <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="productId"
                    value={inputProduct.productId}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Product ID"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="productId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={inputProduct.productName}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Product Name"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="warehouseId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Warehouse Id <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="warehouseId"
                    value={inputProduct.warehouseId}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Warehouse ID"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="warehouseName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Warehouse Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="warehouseName"
                    value={inputProduct.warehouseName}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Warehouse Name"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={inputProduct.quantity}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Quantity"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="shelfName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Shelf Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="shelfName"
                    value={inputProduct.shelfName}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Shelf Name"
                    required
                  />
                </div>
              </div>

              <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                >
                  {action === "Create" ? "Create" : "Update"}
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={close}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
