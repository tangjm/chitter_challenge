import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from '../src/Components/Header';
import AddPeep from './Components/AddPeep';
import AllPeeps from './Components/AllPeeps';

function App() {
  return (
    <div className="App-header">
      <Header />
      <AddPeep />
      <AllPeeps />
    </div>
  );
}

export default App;
