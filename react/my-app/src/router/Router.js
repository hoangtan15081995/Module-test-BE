import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Companies from "../pages/Companies";
import DetailCompany from "../pages/DetailCompany";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Companies />} />
        <Route path="/detail/:id" element={<DetailCompany />} />
      </Route>
    </Routes>
  );
}

export default Router;
