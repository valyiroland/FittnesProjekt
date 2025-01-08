
import './App.css';
import Footer from './Footer';
import HeroSection from './HeroSection';
import Navbar from './Navbar';
import './Home.css';
import Home from './Home';
import Calorie from './Calorie';
import Diet from './Diet';
import BMI from './BMI';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Calorie' element={<Calorie/>}/>
          <Route path='/Diet' element={<Diet/>}/>
          <Route path='/BMI' element={<BMI/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
