import React from "react";
import {  BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "../components/Home";
import Regions from "../components/Regions/Regions";
import Programmes from "../components/Programmes/Programmes";
import Users from "../components/Users/Users";
import Services from "../components/Services/Services";
import Couts from "../components/Couts/Couts";

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/regions" element={<Regions/>} />
      <Route path="/programmes" element={<Programmes/>} />
      <Route path="/users" element={<Users/>} />
      <Route path="/services" element={<Services/>} />
      <Route path="/couts" element={<Couts/>} />
    </Routes>
  </BrowserRouter>
);