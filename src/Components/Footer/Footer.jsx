import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-100 shadow-md mt-2">
      <div className="max-w-9xl mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p className="mb-2 md:mb-0">
          © {new Date().getFullYear()} <span className="font-semibold text-blue-600">AppliTrack</span>. All rights reserved.
        </p>

        <div className="flex gap-4">
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            GitHub
          </a>
          <a
            href="mailto:youremail@example.com"
            className="hover:text-blue-600 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
