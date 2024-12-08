import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <div className="social-links">
                        <a href="#" className="social-icon">
                            <i><FontAwesomeIcon icon={faFacebook} size="lg" /></i>
                        </a>
                        <a href="#" className="social-icon">
                            <i><FontAwesomeIcon icon={faInstagram} size="lg" /></i>
                        </a>
                    </div>
                </div>
                <div className="col-md-4 text-center">
                    <p className="mb-0">FITFORM © 2024</p>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    </footer>
    </div>
  )
}
