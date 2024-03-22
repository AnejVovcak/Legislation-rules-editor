import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import TableViewTax from "./components/TableViewTax";
import MainPage from "./components/MainPage";
import TableViewMig from "./components/TableViewMig";
import TableViewSocSec from "./components/TableViewSocSec";
import Layout from "./components/Layout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout><MainPage /></Layout>} />
            <Route path="/tax" element={<Layout><TableViewTax /></Layout>} />
            <Route path="/mig" element={<Layout><TableViewMig /></Layout>} />
            <Route path="/socSec" element={<Layout><TableViewSocSec /></Layout>} />
        </Routes>
    );
}

export default App;
