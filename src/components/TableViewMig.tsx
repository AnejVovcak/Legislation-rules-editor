import React, {useEffect, useState} from "react";
import {Tax} from "../dtos/tax";
import {MongoRequest} from "../dtos/mongo-request";
import {queryMig, queryTax} from "../api/api";
import {Table, TableBody, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {Mig} from "../dtos/mig";

function TableViewMig() {

    //data of type Tax[] to store the fetched data
    const [data, setData] = useState<Mig[]>([]);

    useEffect(() => {
        const getData = async () => {
            let request:MongoRequest = {
                dataSource: "LawBrainerTest",
                database: "lawBrainer",
                collection: "migStaging",
            }
            try {
                const result = await queryMig(request); // Call the function from api.js
                setData(result); // Set the state with the fetched data
                console.log("Data fetched:", result[0])
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        getData();
    }, []); // Empty dependency array means this effect runs once on mount


    return (
        <Table celled selectable>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Title</TableHeaderCell>
                    <TableHeaderCell>Content</TableHeaderCell>
                    <TableHeaderCell>COVERED</TableHeaderCell>
                    <TableHeaderCell>ARTICLE</TableHeaderCell>
                    <TableHeaderCell>IN</TableHeaderCell>
                    <TableHeaderCell>OUT</TableHeaderCell>
                    <TableHeaderCell>IN TITLE</TableHeaderCell>
                    <TableHeaderCell>OUT TITLE</TableHeaderCell>
                    <TableHeaderCell>SECONDMENT</TableHeaderCell>
                    <TableHeaderCell>NAT</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {/* Render table cells as per your data structure */}
                        <td>{item.title}</td>
                        {/*content is a html text, parse it to show it in a readable way*/}
                        <td dangerouslySetInnerHTML={{__html: item.content}}/>
                        <td>{item["migration-covered"]}</td>
                        <td>{item["migration-article"]}</td>
                        <td>{item["migration-in_value"]}</td>
                        <td>{item["migration-out_value"]}</td>
                        <td>{item["migration-in_title"]}</td>
                        <td>{item["migration-out_title"]}</td>
                        <td>{item["migration-secondment"]}</td>
                        <td>{item["migration-nat"]}</td>
                    </tr>
                ))}
            </TableBody>
        </Table>
    );
}

export default TableViewMig;
