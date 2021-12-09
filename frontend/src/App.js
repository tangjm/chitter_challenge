import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../src/Components/Header';
import AddPeep from './Components/AddPeep';
import AllPeeps from './Components/AllPeeps';

import Login from './Components/UserValidation/Login';
import Register from './Components/UserValidation/Register';

function App() {
  const [user, setUser] = useState({
    "name": "anonymous",
    "username": "anon"
  });

  const port = process.env.REACT_APP_PORT;
  const host = process.env.REACT_APP_HOST;
  const baseUrl = `http://${host}:${port}`;


  return (
    <div className="App-header">
      <Header />
      &nbsp;
      <Router>
        <Routes>
          <Route path="/" element={<AllPeeps baseUrl={baseUrl} />} />
          <Route path="/addPeep" element={<AddPeep baseUrl user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>

    </div >
  );
}

export default App;
