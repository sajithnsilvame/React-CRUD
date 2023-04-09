import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import CreateStudent from "./Pages/CreateStudent";
import EditStudent from "./Pages/EditStudent";
import Home from "./Pages/Home";
import StudentList from "./Pages/StudentList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/create-student" element={<CreateStudent />} />
        <Route path="/student/:id/edit" element={<EditStudent />} />
      </Routes>
    </>
  );
}

export default App;
