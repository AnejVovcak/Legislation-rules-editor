import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import TableViewTax from "./components/tableView/TableViewTax";
import MainPage from "./components/layouts/MainPage";
import TableViewMig from "./components/tableView/TableViewMig";
import TableViewSocSec from "./components/tableView/TableViewSocSec";
import Layout from "./components/layouts/Layout";
import TaxDetail from "./components/detailPages/TaxDetail";
import Login from "./components/login/Login";
import 'react-quill/dist/quill.snow.css';
import MigDetail from "./components/detailPages/MigDetail";
import SocSecDetail from "./components/detailPages/SocSecDetail";
import {columnsMig, fieldsConfigMig} from "./components/tableView/configObjects";
import {CollectionEnum} from "./enums/CollectionEnum";
import {DataType} from "./enums/DataType";
import {Mig} from "./dtos/mig";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout><MainPage /></Layout>} />
            <Route path="/mig" element={<Layout><TableViewMig<Mig>
                dataType={DataType.MIG}
                isProduction={false}
                columns={columnsMig}
                filterFields={fieldsConfigMig}
                newObjectUrl={'/mig/new'}
                collection={CollectionEnum.MIG_STAGING}
            /></Layout>} />
            <Route path="/migProd" element={<Layout><TableViewMig
                dataType={DataType.MIG}
                isProduction={true}
                columns={columnsMig}
                filterFields={fieldsConfigMig}
                newObjectUrl={'/mig/new'}
                collection={CollectionEnum.MIG_PRODUCTION}
            /></Layout>} />
            <Route path="/socSec" element={<Layout><TableViewSocSec isProduction={false}/></Layout>} />
            <Route path="/socSecProd" element={<Layout><TableViewSocSec isProduction={true}/></Layout>} />
            <Route path="/tax" element={<Layout><TableViewTax isProduction={false}/></Layout>} />
            <Route path="/taxProd" element={<Layout><TableViewTax isProduction={true}/></Layout>} />
            <Route path="/tax/:id" element={<Layout><TaxDetail /></Layout>} />
            <Route path="/mig/:id" element={<Layout><MigDetail /></Layout>} />
            <Route path="/socSec/:id" element={<Layout><SocSecDetail /></Layout>} />
            <Route path="/login" element={<Login></Login>} />
        </Routes>
    );
}

export default App;
