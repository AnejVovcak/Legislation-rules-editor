import {Button, Table, TableBody, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {MongoRequest} from "../../dtos/mongo-request";
import {querySocSec} from "../../api/api";
import {SocSec} from "../../dtos/socSec";
import {CoveredEnum} from "../../enums/CoveredEnum";
import {ArticleEnum} from "../../enums/ArticleEnum";
import {InEnum} from "../../enums/InEnum";
import {OutEnum} from "../../enums/OutEnum";
import {EmplEnum} from "../../enums/EmplEnum";
import {TaxEnum} from "../../enums/TaxEnum";
import {getRequestWithFilter, handleFilterChange} from "../../utils/tableFilterUtil";
import TableFilters from "../tableFilters/TableFilters";
import {useNavigate} from "react-router-dom";

function TableViewSocSec() {
//data of type TaxEnum[] to store the fetched data
    const [data, setData] = useState<SocSec[]>([]);
    const navigate = useNavigate(); // For navigation
    const [filters, setFilters] = useState<Record<string, string[]>>({});

    const request: MongoRequest = {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: "socSecStaging",
    }

    const fieldsConfig = [
        {fieldName: 'ssc-covered', enumType: CoveredEnum},
        {fieldName: 'ssc-article', enumType: ArticleEnum},
        {fieldName: 'ssc-in_value', enumType: InEnum},
        {fieldName: 'ssc-out_value', enumType: OutEnum},
        {fieldName: 'ssc-empl', enumType: EmplEnum},
        {fieldName: 'ssc-tax', enumType: TaxEnum}
    ]

    useEffect(() => {
        fetchData()
    }, []); // Empty dependency array means this effect runs once on mount

    const fetchData = () => {
        // Now use requestWithFilter to fetch the data
        querySocSec(getRequestWithFilter(request, filters)).then((result) => {
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
                <Button onClick={() => navigate('/socSec/new')}>Add new</Button>
            </div>
            <Table celled selectable>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Title</TableHeaderCell>
                        <TableHeaderCell>Content</TableHeaderCell>
                        <TableHeaderCell>COVERED</TableHeaderCell>
                        <TableHeaderCell>ARTICLE</TableHeaderCell>
                        <TableHeaderCell>STATUTE</TableHeaderCell>
                        <TableHeaderCell>IN</TableHeaderCell>
                        <TableHeaderCell>OUT</TableHeaderCell>
                        <TableHeaderCell>EMPL</TableHeaderCell>
                        <TableHeaderCell>IF EMPL0 EQ EMPL1</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => navigate(`/socSec/${item._id as string}`)}>
                            {/* Render table cells as per your data structure */}
                            <td>{item.title}</td>
                            {/*content is a html text, parse it to show it in a readable way*/}
                            <td dangerouslySetInnerHTML={{__html: item.content}}/>
                            <td>{item["ssc-covered"]}</td>
                            <td>{item["ssc-article"].map((article, index) => (
                                <div style={{backgroundColor: "lightblue"}} key={index}>{article}</div>
                            ))}</td>
                            <td>{item["ssc-statute"]}</td>
                            <td>{item["ssc-in_value"]}</td>
                            <td>{item["ssc-out_value"]}</td>
                            <td>{item["ssc-empl"]}</td>
                            <td>{item["ssc-if_empl0_eq_empl1"]}</td>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableViewSocSec;