import React, { useState } from 'react';
import '../style/CustomNavbar.css';

const CustomNavbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating logged-in state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Handle the logout logic here (e.g., clearing tokens, redirecting)
    setIsLoggedIn(false);
    setIsDropdownOpen(false); // Close the dropdown on logout
  };

  return (
    <nav className="custom-navbar shadow">
      <div className="navbar-container">
        {/* Navbar Brand */}
        <a href="#" className="navbar-brand">
          <img
            src="src/assets/KHATWTNTK-logo.svg"
            alt="Logo"
            className="navbar-logo"
          />
        </a>

        {/* Mobile Toggle Button */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`navbar-links ${isMobile ? 'active' : ''}`}>
          <a href="#home" className="nav-link">الرئيسية</a>
          <a href="#about" className="nav-link">من نحن</a>
          <a href="#features" className="nav-link">المميزات</a>
          <a href="#doctors" className="nav-link">للأطباء</a>
          <a href="#parents" className="nav-link">للآباء</a>
        </div>

        {/* User Section */}
        {isLoggedIn ? (
          <div className="navbar-user">
            <button className="navbar-user-name" onClick={toggleDropdown}>
              اسم المستخدم
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>تسجيل الخروج</button>
              </div>
            )}
          </div>
        ) : (
          <button className="navbar-btn">ابدأ الآن</button>
        )}
      </div>
    </nav>
  );
};

export default CustomNavbar;
