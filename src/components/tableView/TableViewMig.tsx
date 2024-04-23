import React, {useEffect, useState} from "react";
import {MongoRequest} from "../../dtos/mongo-request";
import {getAllDocuments} from "../../api/api";
import {Button, Table, TableBody, TableHeader, TableRow} from "semantic-ui-react";
import {Mig} from "../../dtos/mig";
import {useNavigate} from "react-router-dom";
import {CoveredEnum} from "../../enums/CoveredEnum";
import {ArticleEnum} from "../../enums/ArticleEnum";
import {InEnum} from "../../enums/InEnum";
import {OutEnum} from "../../enums/OutEnum";
import {SecondmentEnum} from "../../enums/SecondmentEnum";
import {NatEnum} from "../../enums/NatEnum";
import {InTitleEnum} from "../../enums/InTitleEnum";
import {OutTitleEnum} from "../../enums/OutTitleEnum";
import {MigTimeEnum} from "../../enums/MigTimeEnum";
import {getRequestWithFilter, handleFilterChange} from "../../utils/tableFilterUtil";
import TableFilters from "../tableFilters/TableFilters";
import {CollectionEnum} from "../../enums/CollectionEnum";
import {handleSort} from "../../utils/tableSortUtil";
import renderTableHeaderCell from "./TableHeaderUtil";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductionToastr from "./ProductionToastr";

type MigKeys = keyof Mig; // Type representing keys of Mig interface


function TableViewMig({isProduction}: { isProduction: boolean }) {

    //data of type TaxEnum[] to store the fetched data
    const [data, setData] = useState<Mig[]>([]);
    const navigate = useNavigate(); // For navigation
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [column, setColumn] = useState<MigKeys>('title');
    const [direction, setDirection] = useState<'ascending' | 'descending'>('ascending');


    const request: MongoRequest = {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: isProduction ? CollectionEnum.MIG_PRODUCTION : CollectionEnum.MIG_STAGING,
    }

    const fieldsConfig = [
        {fieldName: 'covered', enumType: CoveredEnum},
        {fieldName: 'article', enumType: ArticleEnum},
        {fieldName: 'in_value', enumType: InEnum},
        {fieldName: 'out_value', enumType: OutEnum},
        {fieldName: 'secondment', enumType: SecondmentEnum},
        {fieldName: 'nat', enumType: NatEnum},
        {fieldName: 'in_title', enumType: InTitleEnum},
        {fieldName: 'out_title', enumType: OutTitleEnum},
        {fieldName: 'time', enumType: MigTimeEnum}
    ]

    useEffect(() => {
        fetchData()
    }, []); // Empty dependency array means this effect runs once on mount

    const fetchData = () => {
        // Now use requestWithFilter to fetch the data
        getAllDocuments(getRequestWithFilter(request, filters)).then((result) => {
            setData(result as Mig[]);
        }).catch((error) => {
            console.error("Failed to fetch data:", error);
        });
    };

    useEffect(() => {
        fetchData(); // Call your fetch function which now uses the dynamically constructed request object
    }, [filters]); // Re-fetch data whenever filters change

    const handleSortClick = (clickedColumn: MigKeys) => () => {
        return handleSort(clickedColumn, data, setData, column, setColumn, direction, setDirection);
    };

    const renderTableHeaderCellCaller = (label: string, key: MigKeys) => {
        return renderTableHeaderCell(label, key, column, direction, handleSortClick);
    }

    return (
        <div>
            {isProduction && <ProductionToastr />}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                <TableFilters fieldsConfig={fieldsConfig}
                              onFilterChange={(field, value) => handleFilterChange(field, value, setFilters)}/>
                <Button onClick={() =>
                    isProduction ? {} : navigate('/mig/new')}>Add new</Button>
            </div>
            <Table celled sortable selectable>
                <TableHeader>
                    <TableRow>
                        {renderTableHeaderCellCaller('TITLE', 'title')}
                        {renderTableHeaderCellCaller('CONTENT', 'content')}
                        {renderTableHeaderCellCaller('IN', 'in_value')}
                        {renderTableHeaderCellCaller('OUT', 'out_value')}
                        {renderTableHeaderCellCaller('ARTICLE', 'article')}
                        {renderTableHeaderCellCaller('COVERED', 'covered')}
                        {renderTableHeaderCellCaller('IN TITLE', 'in_title')}
                        {renderTableHeaderCellCaller('NAT', 'nat')}
                        {renderTableHeaderCellCaller('OUT TITLE', 'out_title')}
                        {renderTableHeaderCellCaller('SECONDMENT', 'secondment')}
                        {renderTableHeaderCellCaller('TIME', 'time')}
                        {renderTableHeaderCellCaller('LAST MODIFIED', 'last_modified')}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() =>
                            isProduction ? {} : navigate(`/mig/${item._id as string}`)}>
                            {/* Render table cells as per your data structure */}
                            <td>{item.title}</td>
                            {/*content is a html text, parse it to show it in a readable way*/}
                            <td dangerouslySetInnerHTML={{__html: item.content}}/>
                            <td>{item.in_value}</td>
                            <td>{item.out_value}</td>
                            <td>{item.article.map((time, index) => (
                                <div key={index}>{time}</div>
                            ))}</td>
                            <td>{item.covered}</td>
                            <td>{item.in_title}</td>
                            <td>{item.nat}</td>
                            <td>{item.out_title}</td>
                            <td>{item.secondment}</td>
                            <td>{item.time.map((time, index) => (
                                <div key={index}>{time}</div>
                            ))}</td>
                            <td>
                                <div>{item.last_modified_by}</div>
                                <div>{new Date(item.last_modified).toLocaleString()}</div>
                            </td>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableViewMig;
