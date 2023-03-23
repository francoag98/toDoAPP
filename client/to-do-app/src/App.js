import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { HomePage } from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./Redux/slices/userSlices/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);

  const getSession = () => {
    const json = localStorage.getItem("userSession");
    const res = json ? JSON.parse(json) : null;
    return res;
  };

  useEffect(() => {
    const session = getSession();
    if (session) {
      dispatch(setUserData());
    }
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
