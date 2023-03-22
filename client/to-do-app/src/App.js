import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { HomePage } from "./components/Home";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("userSession");
    const res = json ? JSON.parse(json) : null;
    setUser(res);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/Login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/Register"
          element={user ? <Navigate to="/" /> : <RegisterForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
