import { useState,useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);

  // // Check token in localStorage
  // useEffect(() => {
  //   const token = localStorage.getItem("access");
  //   setLoggedIn(!!token);
  // }, []);

  //   const handleLogout = () => {
  //   localStorage.removeItem("access");
  //   setLoggedIn(false);
  //   window.location.href = "/login"; // redirect to login page
  // };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-blue-600 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for left and right */}
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-indigo-600">
            MyApp
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="hover:underline">
              Home
            </a>
            <a href="/about" className="hover:underline">
              About
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          <>
            <a href="/createpost" className="hover:underline">
              Create Post
            </a>
          </>
          <>
            <a href="/login" className="hover:underline">
              Login
            </a>
            <a href="/register" className="hover:underline">
              Register
            </a>
            <a href="/logout" className="hover:underline">
              <button className="bg-yellow-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Logout</button>
            </a>
          </>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="px-4 pt-4 pb-4 space-y-3">
              <a href="/register" className="block text-gray-700 hover:text-indigo-600">
                Register
              </a>
              <a href="/" className="block text-gray-700 hover:text-indigo-600">
                Home
              </a>
              <a href="/about" className="block text-gray-700 hover:text-indigo-600">
                About
              </a>
              <a href="/contact" className="block text-gray-700 hover:text-indigo-600">
                Contact
              </a>
              <a
                href="/login"
                className="block bg-indigo-600 text-white text-center px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
