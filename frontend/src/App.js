import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../src/Components/Header';
import AddPeep from './Components/AddPeep';
import AllPeeps from './Components/AllPeeps';
import Login from './Components/UserValidation/Login';
import Register from './Components/UserValidation/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const baseUrl = process.env.REACT_APP_NODESERVER;

  return (
    <div className="App-header">
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        &nbsp;
        <Routes>
          <Route path="/" element={<AllPeeps baseUrl={baseUrl} />} />
          <Route path="/addPeep" element={<AddPeep baseUrl={baseUrl} />} />
          <Route path="/login" element={<Login baseUrl={baseUrl} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register baseUrl={baseUrl} />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
