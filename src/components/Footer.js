import React from "react";
import "../styles/Footer.css"; // Import the CSS file for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; Education Centre System</p>
        <ul className="footer-links">
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-of-service">Terms of Service</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
