import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/common/header/Header';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
 import { Contact } from './pages/Contact';
import { Menu } from './components/common/menu/Menu';
import { OtpLogin } from './components/otp-login/OtpLogin';
import { Footer } from './components/common/footer/Footer';

import { Body } from './components/common/Body/Body';
import { Home } from './components/home/Home';
import { UpdateHosp } from './components/UpdateHosp/UpdateHosp';
import { ChangePassword } from './components/changepassword/ChangePassword';

function App() {
  const containerStyle = {
    border: 'solid 1px #ece5e5', 
    boxShadow: '0px 0px 8px #d8d7d7',
    padding:'0px 0px'        
};
  

return (
    <div className="App container" style={containerStyle}>
    <ToastContainer position='top-right'/>
    <Header/>
   
    <Routes>
            <Route path='/' element={<Body/>}/>
            <Route path='/contact-us' element={<Contact/>}/>
            <Route path='/otp-login' element={<OtpLogin/>}/> 
            <Route path='/home' element={<Home/>}/> 
            <Route path='/update-hosp' element={<UpdateHosp/>}/> 
            <Route path='/changepwd' element={<ChangePassword/>}/>
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
