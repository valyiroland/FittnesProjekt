import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Gmail icon

export default function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-2 mb-md-0">
            <div className="social-links">
              {/* Gmail Icon with Contact Us text */}
              <a href="mailto:fitproject446@gmail.com" className="social-icon me-3" aria-label="Contact Us">
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
                <span className="ms-2">Contact Us</span> {/* Added margin to separate the icon and text */}
              </a>
            </div>
          </div>
          <div className="col-md-4 text-center mb-2 mb-md-0">
            <p className="mb-0">FITFORM © 2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
}