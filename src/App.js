
import './App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import './Home.css';
import Home from './Home';
import Calorie from './Calorie';
import Diet from './Diet';
import BMI from './BMI';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';


function App() {
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
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
