import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import "react-datepicker/dist/react-datepicker.css";

import Header from './components/common/header/Header';
import { ToastContainer } from 'react-toastify';
import { Route, Routes ,Navigate} from 'react-router-dom';
import { Contact } from './pages/Contact';
import { OtpLogin } from './components/otp-login/OtpLogin';
import { Footer } from './components/common/footer/Footer';

import  Body  from './components/common/Body/Body';
import  Home  from './components/home/Home';
import { UpdateHosp } from './components/update-hosp/UpdateHosp';
import  ChangePassword  from './components/changepassword/ChangePassword';
import { VerifiedReport } from './components/verifiedreport/VerifiedReport';


import ProtectedRoute from './guards/AuthGuard';
import { PatientReport } from './components/patientreport/PatientReport';
import { PendingReports } from './components/pending-reports/PendingReports';
import { VerifiedList } from './components/verified-list/VerifiedList';
import { GlobalContextProvider } from './context/globalContext';
import { PendingPatient } from './components/pendingpatient/PendingPatient';

function App() {
  const containerStyle = {
    border: 'solid 1px #ece5e5', 
    boxShadow: '0px 0px 8px #d8d7d7',
    padding:'0px 0px'        
};
  

return (
    <div className="App container" style={containerStyle}>
      <GlobalContextProvider>
    <ToastContainer position='top-right'/>
    <Header/>
   
    <Routes>
            <Route path='/' element={<Body/>}/>
            <Route path='/contact-us' element={<Contact/>}/>
            <Route path='/otp-login' element={<OtpLogin/>}/> 
            <Route path='/home' element={<Home/>}/> 
            <Route path='/update-hosp' element={<ProtectedRoute element={UpdateHosp} />}/>
            <Route path='/changepwd' element={<ProtectedRoute element={ChangePassword} />}/>
            <Route path='/patient-report' element={<ProtectedRoute element={PatientReport}/>}/>
            <Route path='/patient-report/pending-reports' element={<ProtectedRoute element={PendingReports}/>}/>
            <Route path='/patient-report/verified-list' element={<ProtectedRoute element={VerifiedList}/>}/>
            <Route path='/patient-report/pending-reports/pending-patient' element={<ProtectedRoute element={PendingPatient}/>}/>
            <Route path="/verified-report" element={<VerifiedReport/>}/>
            <Route path="*" element={<Navigate to="/" />} />

    </Routes>
    
    <Footer/>
    </GlobalContextProvider>
    </div>
  );
}

export default App;
