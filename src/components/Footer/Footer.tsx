import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer-heading logo text-shadow">MMDB</h2>
      <div className="d-flex lists-container">
        <div id="list">
          <h2>The Basics</h2>
          <ul>
            <li>About</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div id="list">
          <h2>Legal</h2>
          <ul>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
