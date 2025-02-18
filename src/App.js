
import './App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import './Home.css';
import Home from './Home';
import Calorie from './Calorie';
import Diet from './Diet';
import BMI from './BMI';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import { useEffect } from 'react';
import Email from './Email';
import ForgotPassword from './ForgotPassword';


function App() {
  const location = useLocation();
  let activepage = "";
  switch (location.pathname) {
    case "/Diet":
      
  activepage = "Diet"
      break;

    case "/BMI":
      activepage = "BMI"
    
      break;
      case "/Calorie":
        activepage = "Calorie"
        break;
        case "/Login":
          activepage = "Login"
          break;
          case "/Registration":
          activepage = "Registration"
          break;
      default:
        activepage="Home"
        break;
      
  }
  useEffect(() => {
    document.title=`${activepage} | FitForm`
  
    }
  , [activepage])
  
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Calorie' element={<Calorie/>}/>
          <Route path='/Diet' element={<Diet/>}/>
          <Route path='/BMI' element={<BMI/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Registration' element={<Registration/>}/>
          <Route path='/Email' element={<Email/>}/>
          <Route path='/ForgotPassword/:token' element={<ForgotPassword/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
