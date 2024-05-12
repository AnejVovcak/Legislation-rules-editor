import React, {useEffect, useState} from "react";
import {MongoRequest} from "../../dtos/mongo-request";
import {getAllDocuments} from "../../api/api";
import {Button, Table, TableHeader, TableRow} from "semantic-ui-react";
import {Mig} from "../../dtos/mig";
import {getRequestWithFilter, handleFilterChange} from "../../utils/tableFilterUtil";
import TableFilters from "../tableFilters/TableFilters";
import {CollectionEnum} from "../../enums/CollectionEnum";
import {handleSort} from "../../utils/tableSortUtil";
import renderTableHeaderCell from "./TableHeaderUtil";
import 'react-toastify/dist/ReactToastify.css';
import ProductionToastr from "../toastrs/ProductionToastr";
import {DataType} from "../../enums/DataType";
import MigBody from "./tableBodies/MigBody";
import SocSecBody from "./tableBodies/SocSecBody";
import TaxBody from "./tableBodies/TaxBody";
import {SocSec} from "../../dtos/socSec";
import {Tax} from "../../dtos/tax";

type TableViewProps<T> = {
    dataType: DataType;
    isProduction: boolean;
    filterFields: { fieldName: string, enumType: any }[];
    columns: { label: string, key: keyof T }[];
    newObjectUrl: string;
    collection: CollectionEnum;
}

function TableView<T>({dataType, isProduction, filterFields, columns, newObjectUrl, collection}: TableViewProps<T>) {

    //data of type TaxEnum[] to store the fetched data
    const [data, setData] = useState<T[]>([]);
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [column, setColumn] = useState<keyof T>('title' as keyof T);
    const [direction, setDirection] = useState<'ascending' | 'descending'>('ascending');
    const [isFirstSorted, setIsFirstSorted] = useState<boolean>(false);


    const request: MongoRequest = {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: collection
    }

    useEffect(() => {
        // Sort only once
        if (!isFirstSorted && data.length > 0) {
            console.log("Sorting data")
            setData(handleSort('title' as keyof T, data, column, setColumn, direction, setDirection, true));
            setIsFirstSorted(true);
        }
    }, [data, isFirstSorted, column, direction]);


    const fetchData = () => {
        // Now use requestWithFilter to fetch the data
        getAllDocuments(getRequestWithFilter(request, filters)).then((result) => {
            setData(result as unknown as T[]);
        }).catch((error) => {
            console.error("Failed to fetch data:", error);
        });
    };

    useEffect(() => {
        fetchData(); // Call your fetch function which now uses the dynamically constructed request object
    }, [filters]); // Re-fetch data whenever filters change

    const handleSortClick = (clickedColumn: keyof T) => () => {
        setData(handleSort(clickedColumn, data, column, setColumn, direction, setDirection));
    };

    const renderTableHeaderCellCaller = (label: string, key: keyof T) => {
        return renderTableHeaderCell(label, key, column, direction, handleSortClick);
    }

    return (
        <div>
            {isProduction && <ProductionToastr/>}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                <TableFilters fieldsConfig={filterFields}
                              onFilterChange={(field, value) => handleFilterChange(field, value, setFilters)}/>
                {!isProduction &&
                    <Button
                        className="fixed-button"
                        primary
                        size='large'
                        onClick={() =>
                            window.open(newObjectUrl)}>Add new</Button>
                }
            </div>
            <Table celled sortable selectable>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            renderTableHeaderCellCaller(column.label, column.key)
                        ))}
                    </TableRow>
                </TableHeader>
                {dataType === DataType.MIG && <MigBody data={data as unknown as Mig[]} isProduction={isProduction}/>}
                {dataType === DataType.SOC_SEC &&
                    <SocSecBody data={data as unknown as SocSec[]} isProduction={isProduction}/>}
                {dataType === DataType.TAX && <TaxBody data={data as unknown as Tax[]} isProduction={isProduction}/>}
            </Table>
        </div>
    );
}

export default TableView;
