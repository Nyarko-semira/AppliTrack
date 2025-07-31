import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import AddJob from "./Components/AddJob";
import Footer from "./Components/Footer";
import JobPreview from "./Components/JobPreview";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddJob />} />
        <Route path="/preview/:id" element={<JobPreview />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
