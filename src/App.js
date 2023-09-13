 import './App.css';
import Header from './components/common/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './components/login/Login';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './components/home/Home';
import { Contact } from './pages/Contact';
import { Menu } from './components/common/menu/Menu';

function App() {
  const containerStyle = {
    border: 'solid 1px #ece5e5', 
    boxShadow: '0px 0px 8px #d8d7d7',
    padding:'0px 0px'        
};
  

return (
    <div className="App container" style={containerStyle}>
    <ToastContainer position='bottom-center'/>
    <Header/>
    <Menu />
    <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/contact-us' element={<Contact/>}/>
                {/* <Route path='/otp-login' element={<OtpLogin/>}/>  */}
    </Routes>
      {/* Footer */}
    </div>
  );
}

export default App;
