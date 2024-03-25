import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import TableViewTax from "./components/tableView/TableViewTax";
import MainPage from "./components/layouts/MainPage";
import TableViewMig from "./components/tableView/TableViewMig";
import TableViewSocSec from "./components/tableView/TableViewSocSec";
import Layout from "./components/layouts/Layout";
import TaxDetail from "./components/detailPages/TaxDetail";
import Login from "./components/login/Login";
import 'react-quill/dist/quill.snow.css';
import MigDetail from "./components/detailPages/MigDetail";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout><MainPage /></Layout>} />
            <Route path="/tax" element={<Layout><TableViewTax /></Layout>} />
            <Route path="/mig" element={<Layout><TableViewMig /></Layout>} />
            <Route path="/socSec" element={<Layout><TableViewSocSec /></Layout>} />
            <Route path="/tax/:id" element={<Layout><TaxDetail /></Layout>} />
            <Route path="/mig/:id" element={<Layout><MigDetail /></Layout>} />
            <Route path="/login" element={<Login></Login>} />
        </Routes>
    );
}

export default App;
