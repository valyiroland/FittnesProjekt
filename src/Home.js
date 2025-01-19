import React, { useState } from "react";
import HeroSection from "./HeroSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator, faWeight, faUtensils } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  // Hover állapotkezelés minden kártyához
  const [hoveredCard, setHoveredCard] = useState(null);

  // Alapértelmezett és hover stílusok
  const defaultStyle = {
    transition: "transform 0.3s ease, boxShadow 0.3s ease",
    transform: "scale(1)",
    boxShadow: "none",
  };

  const hoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
  };

  return (
    <div>
      <HeroSection />
      <section className="py-16 bg-gradient-to-br from-blue-200 via-blue-100 to-green-100">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold text-dark">Our Services</h2>
          <div className="row g-4">
            {/* Calorie Goal Calculator */}
            <div className="col-md-4">
              <div
                className="card h-100 text-center shadow-sm border-0"
                style={hoveredCard === 1 ? hoverStyle : defaultStyle}
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-body">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faCalculator} className="text-primary fa-2x" />
                  </div>
                  <h5 className="card-title fw-bold">Calorie Goal Calculator</h5>
                  <p className="card-text text-muted">
                    Calculate your recommended daily calorie intake based on your fitness goals.
                  </p>
                </div>
              </div>
            </div>
            {/* BMI Calculator */}
            <div className="col-md-4">
              <div
                className="card h-100 text-center shadow-sm border-0"
                style={hoveredCard === 2 ? hoverStyle : defaultStyle}
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-body">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faWeight} className="text-success fa-2x" />
                  </div>
                  <h5 className="card-title fw-bold">BMI Calculator</h5>
                  <p className="card-text text-muted">
                    Calculate and monitor your Body Mass Index for better health insights.
                  </p>
                </div>
              </div>
            </div>
            {/* Diet Plans */}
            <div className="col-md-4">
              <div
                className="card h-100 text-center shadow-sm border-0"
                style={hoveredCard === 3 ? hoverStyle : defaultStyle}
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-body">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faUtensils} className="text-danger fa-2x" />
                  </div>
                  <h5 className="card-title fw-bold">Diet Plans</h5>
                  <p className="card-text text-muted">
                    Access a variety of diet plans to support your fitness journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
