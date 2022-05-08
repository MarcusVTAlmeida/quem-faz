import './App.css';
import Home from './TaskManager'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {

  return (
    <div className='app'>
      <Home />
    </div>
  );
}

export default App;
