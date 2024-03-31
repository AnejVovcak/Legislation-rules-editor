import React, {useEffect, useState} from "react";
import {Button, Table, TableBody, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {queryTax} from "../../api/api";
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

function TableViewTax() {

    //data of type TaxEnum[] to store the fetched data
    const [data, setData] = useState<Tax[]>([]);
    const navigate = useNavigate(); // For navigation
    const [filters, setFilters] = useState<Record<string, string[]>>({});

    const fieldsConfig = [
        {fieldName: 'tax-covered', enumType: CoveredEnum},
        {fieldName: 'tax-article', enumType: ArticleEnum},
        {fieldName: 'tax-in_value', enumType: InEnum},
        {fieldName: 'tax-out_value', enumType: OutEnum},
        {fieldName: 'tax-empl', enumType: EmplEnum},
        {fieldName: 'tax-tax', enumType: TaxEnum}
    ]

    const request: MongoRequest = {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: "taxStaging",
    }

    useEffect(() => {
        fetchData()
    }, []); // Empty dependency array means this effect runs once on mount

    const fetchData = () => {
        // Now use requestWithFilter to fetch the data
        queryTax(getRequestWithFilter(request, filters)).then((result) => {
            setData(result);
        }).catch((error) => {
            console.error("Failed to fetch data:", error);
        });
    };

    useEffect(() => {
        fetchData(); // Call your fetch function which now uses the dynamically constructed request object
    }, [filters]); // Re-fetch data whenever filters change

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                <TableFilters fieldsConfig={fieldsConfig}
                              onFilterChange={(field, value) => handleFilterChange(field, value, setFilters)}/>
                <Button onClick={() => navigate('/tax/new')}>Add new</Button>
            </div>
            <Table celled selectable>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Title</TableHeaderCell>
                        <TableHeaderCell>Text</TableHeaderCell>
                        <TableHeaderCell>COVERED</TableHeaderCell>
                        <TableHeaderCell>ARTICLE</TableHeaderCell>
                        <TableHeaderCell>IN</TableHeaderCell>
                        <TableHeaderCell>OUT</TableHeaderCell>
                        <TableHeaderCell>EMPL</TableHeaderCell>
                        <TableHeaderCell>TAX</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => navigate(`/tax/${item._id as string}`)}>
                            {/* Render table cells as per your data structure */}
                            <td>{item.title}</td>
                            {/*content is a html text, parse it to show it in a readable way*/}
                            <td dangerouslySetInnerHTML={{__html: item.content}}/>
                            <td>{item["tax-covered"]}</td>
                            <td>{item["tax-article"]}</td>
                            <td>{item["tax-in_value"]}</td>
                            <td>{item["tax-out_value"]}</td>
                            <td>{item["tax-empl"]}</td>
                            <td>{item["tax-tax"]}</td>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableViewTax;
