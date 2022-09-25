import React, { lazy } from "react";
import Navbar from "./components/NavbarT";

import ExcercisesList from "./components/ExcercisesList";
const EditExercise = lazy(() => import("./components/EditExcercise"));
const CreateExcercise = lazy(() => import("./components/CreateExcercise"));
const CreateUser = lazy(() => import("./components/CreateUser"));

import { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <Outlet />

              {/* <Footer/> */}
            </div>
          }
        >
          <Route index element={<ExcercisesList />} />
          <Route path="edit/:id" element={<EditExercise />} />
          <Route path="create" element={<CreateExcercise />} />
          <Route path="user" element={<CreateUser />} />
        </Route>
        <Route path="*" element={<></>}/>
      </Routes>
    </div>
  );
}

export default App;
