import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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
                        <Link className="nav-link text-dark"to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-dark" to="/BMI">BMI</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-dark"  to="/Calorie">Calorie</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-dark"  to="/Diet">Diet</Link>
                    </li>
                </ul>
            </div>
            
            <div className="user-icons">
                <Link to='/Login'><i ><FontAwesomeIcon icon={faUser}/></i></Link>
                <Link><i ><FontAwesomeIcon icon={faInfoCircle}/></i></Link>
            </div>
        </div>
    </nav>
    </div>
  )
}
