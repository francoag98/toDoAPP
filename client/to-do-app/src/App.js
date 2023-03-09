import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
