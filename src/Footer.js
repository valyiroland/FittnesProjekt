import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-2 mb-md-0">
            <div className="social-links">
              <a href="#" className="social-icon me-3" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>
          <div className="col-md-4 text-center mb-2 mb-md-0">
            <p className="mb-0">FITFORM © 2024</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
