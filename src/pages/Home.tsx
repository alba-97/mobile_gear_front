import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const categories = [
    { name: "Smartphones", icon: "📱", category: "smartphone" },
    { name: "Accessories", icon: "🎧", category: "accessories" },
    { name: "Tablets", icon: "📲", category: "tablets" },
  ];

  return (
    <div className="flex items-center justify-center my-8">
      <div className="container mx-auto px-4 py-16 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Mobile Gear
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your one-stop shop for the latest mobile devices and accessories
          </p>

          {user ? (
            <div className="mb-8">
              <h2 className="text-3xl text-gray-800 mb-4">
                Hello, {user.firstName} {user.lastName}!
              </h2>
              <p className="text-gray-600 mb-6">
                {user.role === "admin"
                  ? "Manage your store and view analytics"
                  : "Explore our latest products and deals"}
              </p>
            </div>
          ) : (
            <div className="mb-8">
              <p className="text-gray-600 mb-6">
                Sign up or log in to start shopping
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <Link
              to="/products"
              className="bg-blue-600 text-white hover:text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Browse Products
            </Link>

            {!user && (
              <>
                <Link
                  to="/login"
                  className="flex flex-col justify-center bg-green-600 text-white hover:text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex flex-col justify-center bg-purple-600 text-white hover:text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="mt-16">
            <h3 className="text-3xl font-semibold text-gray-800 mb-8">
              Featured Categories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((item) => (
                <div
                  key={item.name}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h4>
                  <Link
                    to={`/products?category=${item.category}`}
                    className="mt-4 inline-block text-blue-600 hover:underline"
                  >
                    Shop Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
