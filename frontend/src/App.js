import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../src/Components/Header';
import AddPeep from './Components/AddPeep';
import AllPeeps from './Components/AllPeeps';

function App() {




  return (
    <div className="App-header">
      <Header />
      &nbsp;
      <Router>
        <Routes>
          <Route path="/" element={<AllPeeps />} />
          <Route path="/addPeep" element={<AddPeep />} />
        </Routes>
      </Router>

    </div >
  );
}

export default App;
