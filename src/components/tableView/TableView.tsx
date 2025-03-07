import React, {useEffect, useState} from "react";
import {getAllDocuments} from "../../api/api";
import {Button, Table, TableHeader, TableRow} from "semantic-ui-react";
import {Mig} from "../../dtos/mig";
import {getRequestWithFilterAndSort, handleFilterChange} from "../../utils/tableFilterUtil";
import TableFilters from "../tableFilters/TableFilters";
import {CollectionEnum} from "../../enums/CollectionEnum";
import renderTableHeaderCell from "./TableHeaderUtil";
import 'react-toastify/dist/ReactToastify.css';
import ProductionToastr from "../toastrs/ProductionToastr";
import {DataType} from "../../enums/DataType";
import MigBody from "./tableBodies/MigBody";
import SocSecBody from "./tableBodies/SocSecBody";
import TaxBody from "./tableBodies/TaxBody";
import {SocSec} from "../../dtos/socSec";
import {Tax} from "../../dtos/tax";
import {CodebookValue} from "../../enums/CodebookValue";
import {handleSubmitBatch} from "../../utils/detailPageUtil";
import config from "../../config";
import GeneralBody from "./tableBodies/GeneralBody";
import {General} from "../../dtos/general";

type TableViewProps<T> = {
    dataType: DataType;
    isProduction: boolean;
    columns: { label: string, key: keyof T }[];
    newObjectUrl: string;
    collection: CollectionEnum;
}

function TableView<T>({dataType, isProduction, columns, newObjectUrl, collection}: TableViewProps<T>) {

    //data of type TaxEnum[] to store the fetched data
    const [data, setData] = useState<T[]>([]);
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [column, setColumn] = useState<keyof T>('title' as keyof T);
    const [direction, setDirection] = useState<'ascending' | 'descending'>('ascending');
    const [filterValues, setFilterValues] = useState<CodebookValue[]>([]);


    useEffect(() => {
        // setIsDev(window.location.pathname.includes("/dev"))
        getAllDocuments(CollectionEnum.CODEBOOK).then((result) => {
            setFilterValues((result as unknown as CodebookValue[]).filter(
                (value) => value.domain.includes(dataType)
            ).sort((a, b) => {
                const indexA = columns.findIndex(column => column.key === a._id);
                const indexB = columns.findIndex(column => column.key === b._id);
                return indexA - indexB;
            }));
        }).catch((error) => {
            console.error("Failed to fetch data:", error);
        });
    }, []);

    const fetchData = () => {
        let getRequestWithFilterAndSortReturn =
            getRequestWithFilterAndSort(filters, column, direction);
        // Now use requestWithFilter to fetch the data
        getAllDocuments(collection,
            getRequestWithFilterAndSortReturn.filter,
            getRequestWithFilterAndSortReturn.sort)
            .then((result) => {
                setData(result as unknown as T[]);
            }).catch((error) => {
            console.error("Failed to fetch data:", error);
        });
    };

    //function that publishes the selected documents
    const publishSelected = async () => {
        //get all checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        //get all checked checkboxes
        const selectedIDs = Array.from(checkboxes).filter((checkbox) => (checkbox as HTMLInputElement).checked)
            .map((checkbox) => checkbox.id);

        //get selected data, filter it by id. selectedIDs is an array of strings
        //@ts-ignore
        const selectedData = data.filter((item) => selectedIDs.includes(item._id)) as (Mig | SocSec | Tax | General)[];

        //submit the selected data
        for (let i = 0; i < selectedData.length; i++) {
            //console.log(selectedData[i]);
            await handleSubmitBatch({...selectedData[i], published: true}, selectedData[i]._id as string, collection);
            await handleSubmitBatch({...selectedData[i], published: true}, selectedData[i]._id as string,
                collection === CollectionEnum.TAX_STAGING ? CollectionEnum.TAX_PRODUCTION :
                    collection === CollectionEnum.MIG_STAGING ? CollectionEnum.MIG_PRODUCTION :
                        collection === CollectionEnum.GENERAL_STAGING ? CollectionEnum.GENERAL_PRODUCTION :
                        collection === CollectionEnum.SOC_SEC_STAGING ? CollectionEnum.SOC_SEC_PRODUCTION : CollectionEnum.CODEBOOK);
        }

        //reload the page
        window.location.reload();
    };

    useEffect(() => {
        fetchData(); // Call your fetch function which now uses the dynamically constructed request object
    }, [filters, column, direction]); // Re-fetch data whenever filters change

    const handleSortClick = (clickedColumn: keyof T) => () => {
        if (column !== clickedColumn) {
            setColumn(clickedColumn);
        } else {
            setDirection(direction === 'ascending' ? 'descending' : 'ascending');
        }
    };

    const renderTableHeaderCellCaller = (label: string, key: keyof T) => {
        return renderTableHeaderCell(label, key, column, direction, handleSortClick);
    }

    return (
        <div>
            {isProduction && <ProductionToastr/>}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                <TableFilters fieldsConfig={filterValues}
                              onFilterChange={(field, value) => handleFilterChange(field, value, setFilters)}/>
                {!isProduction && (
                    <div className="fixed-container" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Button
                            className=""
                            primary
                            size='large'
                            onClick={() => window.open(newObjectUrl)}>Add new
                        </Button>


                            <Button
                                className=""
                                primary
                                size='large'
                                onClick={() => publishSelected()}>Publish selected
                            </Button>

                            <Button
                                className=""
                                primary
                                size='large'
                                onClick={() => window.open(
                                    dataType === DataType.MIG ? config.testingUrlMig :
                                        dataType === DataType.SOC_SEC ? config.testingUrlSocSec :
                                            dataType === DataType.TAX ? config.testingUrlTax : ""
                                )}>Testing view
                            </Button>
                    </div>
                )
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
                {dataType === DataType.MIG &&
                    <MigBody data={data as unknown as Mig[]} isProduction={isProduction} />}
                {dataType === DataType.SOC_SEC &&
                    <SocSecBody data={data as unknown as SocSec[]} isProduction={isProduction} />}
                {dataType === DataType.TAX &&
                    <TaxBody data={data as unknown as Tax[]} isProduction={isProduction} />}
                {dataType === DataType.GENERAL &&
                    <GeneralBody data={data as unknown as General[]} isProduction={isProduction} />}
            </Table>
        </div>
    );
}

export default TableView;
