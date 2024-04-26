import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import MainPage from "./components/layouts/MainPage";
import TableView from "./components/tableView/TableView";
import Layout from "./components/layouts/Layout";
import TaxDetail from "./components/detailPages/TaxDetail";
import Login from "./components/login/Login";
import 'react-quill/dist/quill.snow.css';
import MigDetail from "./components/detailPages/MigDetail";
import SocSecDetail from "./components/detailPages/SocSecDetail";
import {
    columnsMig,
    columnsSocSec, columnsTax,
    fieldsConfigMig,
    fieldsConfigSocSec,
    fieldsConfigTax
} from "./components/tableView/configObjects";
import {CollectionEnum} from "./enums/CollectionEnum";
import {DataType} from "./enums/DataType";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout><MainPage/></Layout>}/>
            <Route path="/mig" element={
                <Layout>
                    <TableView
                        dataType={DataType.MIG}
                        isProduction={false}
                        columns={columnsMig}
                        filterFields={fieldsConfigMig}
                        newObjectUrl={'/mig/new'}
                        collection={CollectionEnum.MIG_STAGING}
                    />
                </Layout>}/>
            <Route path="/migProd" element={<Layout>
                <TableView
                    dataType={DataType.MIG}
                    isProduction={true}
                    columns={columnsMig}
                    filterFields={fieldsConfigMig}
                    newObjectUrl={'/mig/new'}
                    collection={CollectionEnum.MIG_PRODUCTION}
                />
            </Layout>}/>
            <Route path="/socSec" element={
                <Layout>
                    <TableView
                        dataType={DataType.SOC_SEC}
                        isProduction={false}
                        columns={columnsSocSec}
                        filterFields={fieldsConfigSocSec}
                        newObjectUrl={'/socSec/new'}
                        collection={CollectionEnum.SOC_SEC_STAGING}
                    />
                </Layout>}/>
            <Route path="/socSecProd" element={
                <Layout>
                    <TableView
                        dataType={DataType.SOC_SEC}
                        isProduction={true}
                        columns={columnsSocSec}
                        filterFields={fieldsConfigSocSec}
                        newObjectUrl={'/socSec/new'}
                        collection={CollectionEnum.SOC_SEC_PRODUCTION}
                    />
                </Layout>}/>
            <Route path="/tax" element={
                <Layout>
                    <TableView
                        dataType={DataType.TAX}
                        isProduction={false}
                        columns={columnsTax}
                        filterFields={fieldsConfigTax}
                        newObjectUrl={'/tax/new'}
                        collection={CollectionEnum.TAX_STAGING}
                    />
                </Layout>}/>
            <Route path="/taxProd" element={
                <Layout>
                    <TableView
                        dataType={DataType.TAX}
                        isProduction={true}
                        columns={columnsTax}
                        filterFields={fieldsConfigTax}
                        newObjectUrl={'/tax/new'}
                        collection={CollectionEnum.TAX_PRODUCTION}
                    />
                </Layout>}/>
            <Route path="/tax/:id" element={<Layout><TaxDetail/></Layout>}/>
            <Route path="/mig/:id" element={<Layout><MigDetail/></Layout>}/>
            <Route path="/socSec/:id" element={<Layout><SocSecDetail/></Layout>}/>
            <Route path="/login" element={<Login></Login>}/>
        </Routes>
    );
}

export default App;
