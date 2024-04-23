import React, {useEffect, useState} from "react";
import {Button, Table, TableBody, TableHeader, TableRow} from "semantic-ui-react";
import {MongoRequest} from "../../dtos/mongo-request";
import {Tax} from "../../dtos/tax";
import {useNavigate} from "react-router-dom";
import TableFilters from "../tableFilters/TableFilters";
import {CoveredEnum} from "../../enums/CoveredEnum";
import {ArticleEnum} from "../../enums/ArticleEnum";
import {InEnum} from "../../enums/InEnum";
import {OutEnum} from "../../enums/OutEnum";
import {EmplEnum} from "../../enums/EmplEnum";
import {TaxEnum} from "../../enums/TaxEnum";
import {getRequestWithFilter, handleFilterChange} from "../../utils/tableFilterUtil";
import {getAllDocuments} from "../../api/api";
import {CollectionEnum} from "../../enums/CollectionEnum";
import {handleSort} from "../../utils/tableSortUtil";
import renderTableHeaderCell from "./TableHeaderUtil";

type TaxKeys = keyof Tax; // Type representing keys of Tax interface

function TableViewTax({isProduction}: { isProduction: boolean }) {

    //data of type TaxEnum[] to store the fetched data
    const [data, setData] = useState<Tax[]>([]);
    const navigate = useNavigate(); // For navigation
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [column, setColumn] = useState<TaxKeys>('title');
    const [direction, setDirection] = useState<'ascending' | 'descending'>('ascending');

    const fieldsConfig = [
        {fieldName: 'in_value', enumType: InEnum},
        {fieldName: 'out_value', enumType: OutEnum},
        {fieldName: 'covered', enumType: CoveredEnum},
        {fieldName: 'article', enumType: ArticleEnum},
        {fieldName: 'empl', enumType: EmplEnum},
        {fieldName: 'tax', enumType: TaxEnum}
    ]

    const request: MongoRequest = {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: isProduction ? CollectionEnum.TAX_PRODUCTION : CollectionEnum.TAX_STAGING,
    }

    useEffect(() => {
        fetchData()
    }, []); // Empty dependency array means this effect runs once on mount

    const fetchData = () => {
        // Now use requestWithFilter to fetch the data
        getAllDocuments(getRequestWithFilter(request, filters)).then((result) => {
            setData(result as Tax[]);
        }).catch((error) => {
            console.error("Failed to fetch data:", error);
        });
    };

    useEffect(() => {
        fetchData(); // Call your fetch function which now uses the dynamically constructed request object
    }, [filters]); // Re-fetch data whenever filters change

    const handleSortClick = (clickedColumn: TaxKeys) => () => {
        return handleSort(clickedColumn, data, setData, column, setColumn, direction, setDirection);
    };

    const renderTableHeaderCellCaller = (label: string, key: TaxKeys) => {
        return renderTableHeaderCell(label, key, column, direction, handleSortClick);
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                <TableFilters fieldsConfig={fieldsConfig}
                              onFilterChange={(field, value) => handleFilterChange(field, value, setFilters)}/>
                <Button onClick={() =>
                    isProduction ? {} : navigate('/tax/new')}>Add new</Button>
            </div>
            <Table celled sortable selectable>
                <TableHeader>
                    <TableRow>
                        {renderTableHeaderCellCaller('Title', 'title')}
                        {renderTableHeaderCellCaller('Content', 'content')}
                        {renderTableHeaderCellCaller('In Value', 'in_value')}
                        {renderTableHeaderCellCaller('Out Value', 'out_value')}
                        {renderTableHeaderCellCaller('Article', 'article')}
                        {renderTableHeaderCellCaller('Covered', 'covered')}
                        {renderTableHeaderCellCaller('Empl', 'empl')}
                        {renderTableHeaderCellCaller('Tax', 'tax')}
                        {renderTableHeaderCellCaller('Last Modified', 'last_modified')}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() =>
                            isProduction ? {} : navigate(`/tax/${item._id as string}`)}>
                            {/* Render table cells as per your data structure */}
                            <td>{item.title}</td>
                            {/*content is a html text, parse it to show it in a readable way*/}
                            <td dangerouslySetInnerHTML={{__html: item.content}}/>
                            <td>{item.in_value}</td>
                            <td>{item.out_value}</td>
                            <td>{item.article.map((time, index) => (
                                <div key={index}>{time}</div>
                            ))}</td>
                            <td>{item.covered.map((time, index) => (
                                <div key={index}>{time}</div>
                            ))}</td>
                            <td>{item.empl}</td>
                            <td>{item.tax}</td>
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

export default TableViewTax;
