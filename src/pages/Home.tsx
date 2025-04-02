import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../store/slices/productSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    smallMobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const categories = [
    {
      name: "Smartphones",
      icon: "📱",
      category: "smartphone",
      bgClass: "bg-gradient-to-br from-blue-500 to-blue-600",
      hoverClass: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      name: "Accessories",
      icon: "🎧",
      category: "accessories",
      bgClass: "bg-gradient-to-br from-green-500 to-green-600",
      hoverClass: "hover:from-green-600 hover:to-green-700",
    },
    {
      name: "Tablets",
      icon: "📲",
      category: "tablets",
      bgClass: "bg-gradient-to-br from-purple-500 to-purple-600",
      hoverClass: "hover:from-purple-600 hover:to-purple-700",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50"
    >
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "url('/pattern.svg')",
            backgroundSize: "30px 30px",
          }}
        />
        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
          variants={itemVariants}
        >
          <motion.h1
            className="text-6xl font-bold mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              Mobile Gear
            </span>
          </motion.h1>
          <p className="text-2xl mb-8 text-gray-100">
            Your one-stop shop for the latest mobile devices and accessories
          </p>

          <AnimatePresence>
            {user ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-3xl mb-4">
                  Welcome back, {user.firstName} {user.lastName}!
                </h2>
                <p className="text-gray-200">
                  {user.role === "admin"
                    ? "Manage your store and view analytics"
                    : "Explore our latest products and deals"}
                </p>
              </motion.div>
            ) : (
              <motion.div
                className="flex justify-center gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/login"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 inline-block"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/register"
                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 inline-block"
                  >
                    Register
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            Featured Products
          </motion.h2>
          <div className="relative">
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 500ms ease-in-out"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              itemClass="px-4"
            >
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="h-full">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden h-full"
                  >
                    <div className="relative overflow-hidden group">
                      <img
                        src={product.img || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link
                          to={`/products/${product.id}`}
                          className="bg-white text-blue-600 px-6 py-2 rounded-lg transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`${item.bgClass} ${item.hoverClass} p-8 rounded-2xl shadow-xl text-white text-center transform transition-all duration-300`}
              >
                <motion.div
                  className="text-7xl mb-6"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{item.name}</h3>
                <Link
                  to={`/products?category=${item.category}`}
                  className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  Shop Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
