import React from "react";
import { Link, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <div className="flex space-x-4">
              <Link
                to="/admin/orders"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/admin/orders")
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Orders
              </Link>
              <Link
                to="/admin/products"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/admin/products")
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Products
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
