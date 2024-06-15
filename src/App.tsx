import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import MainPage from "./components/layouts/MainPage";
import TableView from "./components/tableView/TableView";
import Layout from "./components/layouts/Layout";
import Login from "./components/login/Login";
import 'react-quill/dist/quill.snow.css';
import {
    columnsMig,
    columnsSocSec,
    columnsTax,
    fieldsConfigMig,
    fieldsConfigSocSec,
    fieldsConfigTax
} from "./components/tableView/configObjects";
import {CollectionEnum} from "./enums/CollectionEnum";
import {DataType} from "./enums/DataType";
import DetailPage from "./components/detailPages/DetailPage";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout><MainPage/></Layout>}/>
            <Route path="dev/mig" element={<Layout>
                <TableView
                    dataType={DataType.MIG}
                    isProduction={false}
                    columns={columnsMig}
                    filterFields={fieldsConfigMig}
                    newObjectUrl={'mig/new'}
                    collection={CollectionEnum.MIG_DEV}
                />
            </Layout>}/>
            <Route path="staging/mig" element={
                <Layout>
                    <TableView
                        dataType={DataType.MIG}
                        isProduction={false}
                        //add column for select at the beginning
                        columns={
                            [{label: 'SELECT', key: 'select'}, ...columnsMig]
                        }
                        filterFields={fieldsConfigMig}
                        newObjectUrl={'mig/new'}
                        collection={CollectionEnum.MIG_STAGING}
                    />
                </Layout>}/>
            <Route path="prod/mig" element={<Layout>
                <TableView
                    dataType={DataType.MIG}
                    isProduction={true}
                    columns={columnsMig}
                    filterFields={fieldsConfigMig}
                    newObjectUrl={'mig/new'} //unused
                    collection={CollectionEnum.MIG_PRODUCTION}
                />
            </Layout>}/>
            <Route path="dev/socSec" element={
                <Layout>
                    <TableView
                        dataType={DataType.SOC_SEC}
                        isProduction={false}
                        columns={columnsSocSec}
                        filterFields={fieldsConfigSocSec}
                        newObjectUrl={'socSec/new'}
                        collection={CollectionEnum.SOC_SEC_DEV}
                    />
                </Layout>}/>
            <Route path="staging/socSec" element={
                <Layout>
                    <TableView
                        dataType={DataType.SOC_SEC}
                        isProduction={false}
                        columns={
                            [{label: 'SELECT', key: 'select'}, ...columnsSocSec]
                        }
                        filterFields={fieldsConfigSocSec}
                        newObjectUrl={'socSec/new'}
                        collection={CollectionEnum.SOC_SEC_STAGING}
                    />
                </Layout>}/>
            <Route path="prod/socSec" element={
                <Layout>
                    <TableView
                        dataType={DataType.SOC_SEC}
                        isProduction={true}
                        columns={columnsSocSec}
                        filterFields={fieldsConfigSocSec}
                        newObjectUrl={'/socSec/new'} //unused
                        collection={CollectionEnum.SOC_SEC_PRODUCTION}
                    />
                </Layout>}/>
            <Route path="dev/tax" element={
                <Layout>
                    <TableView
                        dataType={DataType.TAX}
                        isProduction={false}
                        columns={columnsTax}
                        filterFields={fieldsConfigTax}
                        newObjectUrl={'tax/new'}
                        collection={CollectionEnum.TAX_DEV}
                    />
                </Layout>}/>
            <Route path="staging/tax" element={
                <Layout>
                    <TableView
                        dataType={DataType.TAX}
                        isProduction={false}
                        columns={
                            [{label: 'SELECT', key: 'select'}, ...columnsTax]
                        }
                        filterFields={fieldsConfigTax}
                        newObjectUrl={'tax/new'}
                        collection={CollectionEnum.TAX_STAGING}
                    />
                </Layout>}/>
            <Route path="prod/tax" element={
                <Layout>
                    <TableView
                        dataType={DataType.TAX}
                        isProduction={true}
                        columns={columnsTax}
                        filterFields={fieldsConfigTax}
                        newObjectUrl={'/tax/new'} //unused
                        collection={CollectionEnum.TAX_PRODUCTION}
                    />
                </Layout>}/>
            <Route path="staging/tax/:id" element={<Layout><DetailPage dataType={DataType.TAX}
                                                                collectionDev={CollectionEnum.TAX_DEV}
                                                                collectionProduction={CollectionEnum.TAX_PRODUCTION}
                                                                collectionStaging={CollectionEnum.TAX_STAGING}/></Layout>}/>
            <Route path="staging/mig/:id" element={<Layout><DetailPage dataType={DataType.MIG}
                                                                collectionDev={CollectionEnum.MIG_DEV}
                                                                collectionProduction={CollectionEnum.MIG_PRODUCTION}
                                                                collectionStaging={CollectionEnum.MIG_STAGING}/></Layout>}/>
            <Route path="staging/socSec/:id" element={<Layout><DetailPage dataType={DataType.SOC_SEC}
                                                                     collectionDev={CollectionEnum.SOC_SEC_DEV}
                                                                   collectionProduction={CollectionEnum.SOC_SEC_PRODUCTION}
                                                                   collectionStaging={CollectionEnum.SOC_SEC_STAGING}/></Layout>}/>
            <Route path="dev/tax/:id" element={<Layout><DetailPage dataType={DataType.TAX}
                                                                collectionDev={CollectionEnum.TAX_DEV}
                                                                collectionProduction={CollectionEnum.TAX_PRODUCTION}
                                                                collectionStaging={CollectionEnum.TAX_STAGING}/></Layout>}/>
            <Route path="dev/mig/:id" element={<Layout><DetailPage dataType={DataType.MIG}
                                                                collectionDev={CollectionEnum.MIG_DEV}
                                                                collectionProduction={CollectionEnum.MIG_PRODUCTION}
                                                                collectionStaging={CollectionEnum.MIG_STAGING}/></Layout>}/>
            <Route path="dev/socSec/:id" element={<Layout><DetailPage dataType={DataType.SOC_SEC}
                                                                   collectionDev={CollectionEnum.SOC_SEC_DEV}
                                                                   collectionProduction={CollectionEnum.SOC_SEC_PRODUCTION}
                                                                   collectionStaging={CollectionEnum.SOC_SEC_STAGING}/></Layout>}/>
            <Route path="/login" element={<Login></Login>}/>
        </Routes>
    );
}

export default App;
