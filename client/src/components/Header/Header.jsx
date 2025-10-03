import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/auth.feature";

function Header() {
  const { role, token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold text-blue-600">Daily Reports</div>

      <nav className="flex items-center space-x-4">
        {!token ? (
          <>
            <NavLink
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              to="/register"
            >
              Register
            </NavLink>
            <NavLink
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              to="/login"
            >
              Login
            </NavLink>
          </>
        ) : (
          <>
            {role === "admin" && (
              <NavLink
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                to="/admin-dashboard"
              >
                Admin Dashboard
              </NavLink>
            )}
            {role === "user" && (
              <NavLink
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                to="/user-dashboard"
              >
                User Dashboard
              </NavLink>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
