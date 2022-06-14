import React from "react";
import {  BrowserRouter,Routes,Route, useNavigate,useLocation, Navigate } from "react-router-dom";
import Home from "../components/Home";
import Regions from "../components/Regions/Regions";
import Programmes from "../components/Programmes/Programmes";
import Users from "../components/Users/Users";
import Services from "../components/Services/Services";
import Couts from "../components/Couts/Couts";
import New from "../components/Mouvements/New";
import Edit from "../components/Mouvements/Edit";
import Index from "../components/Mouvements/Index";
import Objectifs from "../components/Objectifs/Objectifs";
import Historique from "../components/DB/Historique";
import Index_couts from "../components/Couts/Index_couts";
import Faq from "../components/Faq";
import Accessibilite from "../components/Accessibilite";
import Donnees from "../components/Donnees";
import Mentions from "../components/Mentions";

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/regions" element={<Regions/>} />
      <Route path="/programmes" element={<Programmes/>} />
      <Route path="/users" element={<Users/>} />
      <Route path="/services" element={<Services/>} />
      <Route path="/couts" element={<Couts/>} />
      <Route path="/mouvements" element={<New/>} />
      <Route path="/mouvements/edit" element={<Edit/>} />
      <Route path="/historique" element={<Index/>} />
      <Route path="/objectifs" element={<Objectifs/>} />
      <Route path="/couts-etp" element={<Index_couts/>} />
      <Route path="/mouvements-globaux" element={<Historique/>} />
      <Route path="/faq" element={<Faq/>} />
      <Route path="/accessibilite" element={<Accessibilite/>} />
      <Route path="/donnees-personnelles" element={<Donnees/>} />
      <Route path="/mentions-legales" element={<Mentions/>} />
    </Routes>
  </BrowserRouter>
);