import { Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeList from './components/EmployeeList/EmployeeList';
import Navbar from './components/Navbar/Navbar';
import CreateEmployee from './components/CreateEmployee/CreateEmployee';
import ViewEmployee from './components/ViewEmployee/ViewEmployee';
import EditEmployee from './components/EditEmployee/EditEmployee';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/employee-app' element={<EmployeeList />}></Route>
        <Route path='/employee-app/create' element={<CreateEmployee />}></Route>
        <Route path='/employee-app/view/:employeeId' element={<ViewEmployee />}></Route>
        <Route path='/employee-app/edit/:employeeId' element={<EditEmployee />}></Route>
      </Routes>
    </>
  );
}

export default App;
