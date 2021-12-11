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
  const defaultUser = {
    "name": "anonymous",
    "username": "anon"
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(defaultUser);

  const baseUrl = process.env.REACT_APP_NODESERVER;

  return (
    <div className="App-header">
      <Router>
        <Header isLoggedIn={isLoggedIn} setUser={setUser} defaultUser={defaultUser} />
        &nbsp;
        <Routes>
          <Route path="/" element={<AllPeeps baseUrl={baseUrl} />} />
          <Route path="/addPeep" element={<AddPeep baseUrl={baseUrl} user={user} />} />
          <Route path="/login" element={<Login baseUrl={baseUrl} setUser={setUser} />} />
          <Route path="/register" element={<Register baseUrl={baseUrl} />} />
        </Routes>
      </Router>

    </div >
  );
}

export default App;
