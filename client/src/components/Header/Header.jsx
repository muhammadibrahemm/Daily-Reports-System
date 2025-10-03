import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">Daily Reports</div>

      {/* Navigation */}
      <nav className="flex items-center space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Register
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
          Login
        </button>
      </nav>
    </header>
  );
}

export default Header;
