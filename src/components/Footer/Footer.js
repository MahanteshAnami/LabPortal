import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8  w-full">
      <div className="px-6 grid grid-cols-12 items-center text-xl">
        <div className="footer-logo  col-span-3">
          <img
            src="./images/testtubelogo.png"
            alt="Logo"
            className="h-16 mr-4"
          />
        </div>
        <div className="footer-links   col-span-3">
          <ul>
            <Link to="/resources" className="mx-4 text-2xl font-semibold">
              Resources
            </Link>
            <li>
              {" "}
              <Link to="/guide" className="mx-4">
                Guide
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/test-repository" className="mx-4">
                Test Repository
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="mx-4">
                Privacy Policy
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/terms-of-use" className="mx-4">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-3">
          <ul>
            <li>
              {" "}
              <Link to="/who" className="mx-4 text-2xl font-semibold">
                Who?
              </Link>
            </li>
            <li>
              <Link to="/about" className="mx-4">
                About Us
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/contact" className="mx-4">
                Contact Us
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/support" className="mx-4">
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-contact-info text-right col-span-3">
          <ul>
            <li>Support</li>
            <li>
              {" "}
              <p>
                Email:{" "}
                <Link to="mailto:hello@hspathology.com">
                  hello@hspathology.com
                </Link>
              </p>
            </li>
            <li>
              {" "}
              <p>
                Phone: <Link to="tel:+442071002727">020 7100 2727</Link>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-600">
          &copy; 2024 Harley Street Pathology Services - All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
