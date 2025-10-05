import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="px-8 py-8 bg-gray-100 text-center">
      <div className="mb-4 text-blue-600 font-bold text-xl">Daily Reports</div>

      <div className="mb-4">
        <NavLink
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Home
        </NavLink>
      </div>

      <p className="text-gray-500 text-sm">
        © 2025 Daily Reports System. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
