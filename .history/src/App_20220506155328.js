import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import ProfileEdit from "./ProfileEdit";
import App1 from "./App1"

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
        <Route exact path="/" element={<App1 />} />
          <Route exact path="/d" element={<Dashboard />} />
          <Route exact path="/profile" element={<ProfileEdit />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
