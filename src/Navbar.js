import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

export default function navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
            <a className="navbar-brand" href="#">
               
            </a>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">BMI</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Calorie</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Diet</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                </ul>
            </div>
            
            <div className="user-icons">
                <i ><FontAwesomeIcon icon={faUser}/></i>
                <i ><FontAwesomeIcon icon={faInfoCircle}/></i>
            </div>
        </div>
    </nav>
    </div>
  )
}
