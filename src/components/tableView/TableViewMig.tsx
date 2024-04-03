import React, {useEffect, useState} from "react";
import {MongoRequest} from "../../dtos/mongo-request";
import {queryMig} from "../../api/api";
import {Button, Table, TableBody, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
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

function TableViewMig() {

    //data of type TaxEnum[] to store the fetched data
    const [data, setData] = useState<Mig[]>([]);
    const navigate = useNavigate(); // For navigation
    const [filters, setFilters] = useState<Record<string, string[]>>({});

    const request: MongoRequest = {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: "migStaging",
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
        queryMig(getRequestWithFilter(request, filters)).then((result) => {
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
                <Button onClick={() => navigate('/mig/new')}>Add new</Button>
            </div>
            <Table celled selectable>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>TITLE</TableHeaderCell>
                        <TableHeaderCell>CONTENT</TableHeaderCell>
                        <TableHeaderCell>IN</TableHeaderCell>
                        <TableHeaderCell>OUT</TableHeaderCell>
                        <TableHeaderCell>ARTICLE</TableHeaderCell>
                        <TableHeaderCell>COVERED</TableHeaderCell>
                        <TableHeaderCell>IN TITLE</TableHeaderCell>
                        <TableHeaderCell>NAT</TableHeaderCell>
                        <TableHeaderCell>OUT TITLE</TableHeaderCell>
                        <TableHeaderCell>SECONDMENT</TableHeaderCell>
                        <TableHeaderCell>TIME</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => navigate(`/mig/${item._id as string}`)}>
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
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableViewMig;
