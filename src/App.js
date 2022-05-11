import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import ProfileEdit from "./ProfileEdit";
import CompleteRegister from './CompleteRegister'

function App() {
  return (
    <div>
      <Router basename="/quem-faz">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/profile" element={<ProfileEdit />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/CompleteRegister" element={<CompleteRegister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
