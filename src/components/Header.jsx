import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "/assets/logo.jpg"; // Ensure this path is correct

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="w-full bg-black shadow-md px-4 sm:px-6 py-3 flex justify-between items-center relative z-50">
      {/* Logo + Title */}
      <div className="flex items-center gap-2 sm:gap-3">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <h1 className="text-lg sm:text-2xl font-bold text-white tracking-wide">
          Wijethunga Photography
        </h1>
      </div>

      {/* Hamburger Icon */}
      <button
        className="sm:hidden text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Navigation */}
      <nav className="hidden sm:flex gap-6 text-sm sm:text-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition ${
                isActive
                  ? "border-b-2 border-white text-white"
                  : "text-gray-300 hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center py-4 sm:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `w-full text-center py-2 border-b border-gray-700 ${
                  isActive ? "text-white font-semibold" : "text-gray-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}