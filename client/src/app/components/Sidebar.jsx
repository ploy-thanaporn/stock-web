"use client";
import React, { useEffect, useState } from "react";
import { HiShoppingBag } from "react-icons/hi2";
import { FaWarehouse } from "react-icons/fa";
import Link from "next/link";

const Sidebar = ({ component }) => {
  const [selectedItem, setSelectedItem] = useState("");

  const sideBarData = [
    {
      title: "Products",
      icon: <HiShoppingBag className="w-full h-full" />,
      link: "/products",
    },
    {
      title: "Warehouse",
      icon: <FaWarehouse className="w-full h-full" />,
      link: "/warehouse",
    },
  ];

  useEffect(() => {
    const savedItem = localStorage.getItem("selectedMenu");
    if (savedItem) {
      setSelectedItem(savedItem);
    }
  }, []);

  const handleClickSidebar = (title) => {
    setSelectedItem(title);
    localStorage.setItem("selectedMenu", title);
  };

  return (
    <div className="flex h-screen">
      <div className="w-56 h-full z-40">
        <div className="h-full px-4 py-4 overflow-y-auto bg-gray-50">
          <Link href="/products" className="flex items-center mb-5">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Workshop <span className="text-red-600">Gosoft</span>
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            {sideBarData.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.link}
                  className={`flex items-center p-2 rounded-lg group ${
                    selectedItem === item.title ? "bg-gray-200" : ""
                  } hover:bg-gray-200`}
                  onClick={() => handleClickSidebar(item.title)}
                >
                  <div
                    className={`flex-shrink-0 w-5 h-5 transition duration-75 ${
                      selectedItem === item.title
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 z-50 p-4 mx-6">{component}</div>
    </div>
  );
};

export default Sidebar;
