import React from "react";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import { Route, Routes } from "react-router-dom";
import SlideBar from "./component/SlideBar";
import ShowStudent from "./pages/ShowStudent";
import ShowTeacher from "./pages/ShowTeacher";

const App = () => {
  return (
    <Routes>
      <Route element={<SlideBar />}>
        <Route path="/" element={<Dashboard />} />
        <Route
  path="/add-student"
  element={<AddStudent />}
/>

<Route
  path="/add-student/:id"
  element={<AddStudent />}
/>
        <Route path="/show-student" element={<ShowStudent />} />
        <Route path="/show-teacher" element={<ShowTeacher />} />
      </Route>
    </Routes>
  );
};

export default App;
