import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-[#2ad9df] text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Ansarul Islam
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
