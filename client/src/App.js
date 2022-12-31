import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "../src/components/Home/Home";
import Welcome from "./components/Welcome/Welcome";
import Nav from "./components/Nav/Nav";
import Create from "./components/Create/Create";
import Detail from "./components/Detail/Detail";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  const ingresar = () => {
    setAccess(true);
    navigate("/home");
  };

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav location={location} />}
      
      <Routes>
        <Route path="/" element={<Welcome access={ingresar} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createDog" element={<Create />} />
        <Route path={`/home/:id`} element={<Detail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {location.pathname !== "/" && <Footer/>}
    </div>
  );
}

export default App;
