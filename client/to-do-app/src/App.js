import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
