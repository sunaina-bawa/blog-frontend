import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Components/HomePage";
import Login from "./Login";
import Signup from "./SignUp";
import NewBlog from "./NewBlog";
import PrivateRoute from "../Components/PrivateRoute";
import Blogs from "./Blogs";
import EditBlog from "./EditBlog";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/allblogs"
        element={
          <PrivateRoute>
            <Blogs />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/addblog"
        element={
          <PrivateRoute>
            <NewBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/Edit/:id"
        element={
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h3>404 Page not found</h3>} />
    </Routes>
  );
};

export default MainRoutes;
