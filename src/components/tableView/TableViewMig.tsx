import React, {useEffect, useState} from "react";
import {MongoRequest} from "../../dtos/mongo-request";
import {getAllDocuments} from "../../api/api";
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
import {CollectionEnum} from "../../enums/CollectionEnum";

type MigKeys = keyof Mig; // Type representing keys of Mig interface


function TableViewMig() {

    //data of type TaxEnum[] to store the fetched data
    const [data, setData] = useState<Mig[]>([]);
    const navigate = useNavigate(); // For navigation
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [column, setColumn] = useState<string>('');
    const [direction, setDirection] = useState<'ascending' | 'descending'>('ascending');


    const request: MongoRequest = {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: CollectionEnum.MIG
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

    const handleSort = (clickedColumn: MigKeys) => () => {
        if (column !== clickedColumn) {
            setColumn(clickedColumn);
            setData(data.sort((a, b) => a[clickedColumn]! > b[clickedColumn]! ? 1 : -1));
            setDirection('ascending');
        } else {
            setData(data.reverse());
            setDirection(direction === 'ascending' ? 'descending' : 'ascending');
        }
    };


    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

                <TableFilters fieldsConfig={fieldsConfig}
                              onFilterChange={(field, value) => handleFilterChange(field, value, setFilters)}/>
                <Button onClick={() => navigate('/mig/new')}>Add new</Button>
            </div>
            <Table celled sortable selectable>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell
                            sorted={column === 'title' ? direction : undefined}
                            onClick={handleSort('title')}
                        >TITLE</TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'content' ? direction : undefined}
                            onClick={handleSort('content')}
                        >CONTENT</TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'in_value' ? direction : undefined}
                            onClick={handleSort('in_value')}
                        >IN</TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'out_value' ? direction : undefined}
                            onClick={handleSort('out_value')}
                        >OUT</TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'article' ? direction : undefined}
                            onClick={handleSort('article')}
                        >ARTICLE</TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'covered' ? direction : undefined}
                            onClick={handleSort('covered')}
                        >COVERED</TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'in_title' ? direction : undefined}
                            onClick={handleSort('in_title')}
                        >IN TITLE</TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'nat' ? direction : undefined}
                            onClick={handleSort('nat')}
                        >NAT</TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'out_title' ? direction : undefined}
                            onClick={handleSort('out_title')}
                        >OUT TITLE</TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'secondment' ? direction : undefined}
                            onClick={handleSort('secondment')}
                        >SECONDMENT</TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'time' ? direction : undefined}
                            onClick={handleSort('time')}
                        >TIME</TableHeaderCell>
                        <TableHeaderCell
                            sorted={column === 'last_modified' ? direction : undefined}
                            onClick={handleSort('last_modified')}
                        >LAST UPDATED</TableHeaderCell>
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
