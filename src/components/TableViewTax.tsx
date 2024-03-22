import React, {useEffect, useState} from "react";
import {
    Button,
    Checkbox,
    Form, Icon, Label, Menu,
    MenuItem,
    Table,
    TableBody, TableCell, TableFooter,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import {queryTax} from "../api/api";
import {MongoRequest} from "../dtos/mongo-request";
import {Tax} from "../dtos/tax";


function TableViewTax() {

    //data of type Tax[] to store the fetched data
    const [data, setData] = useState<Tax[]>([]);

    useEffect(() => {
        const getData = async () => {
            let request:MongoRequest = {
                dataSource: "LawBrainerTest",
                database: "lawBrainer",
                collection: "tax",
            }
            try {
                const result = await queryTax(request); // Call the function from api.js
                setData(result); // Set the state with the fetched data
                console.log("Data fetched:", result[0])
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        getData();
    }, []); // Empty dependency array means this effect runs once on mount


    return (
        <Table striped>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Title</TableHeaderCell>
                    <TableHeaderCell>Text</TableHeaderCell>
                    <TableHeaderCell>COVERED</TableHeaderCell>
                    <TableHeaderCell>ARTICLE</TableHeaderCell>
                    <TableHeaderCell>IN</TableHeaderCell>
                    <TableHeaderCell>OUT</TableHeaderCell>
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
                        <td>{item["tax-covered"]}</td>
                        <td>{item["tax-article"]}</td>
                        <td>{item["tax-out_value"]}</td>
                        <td>{item["tax-in_value"]}</td>
                        <td>{item["tax-empl"]}</td>
                        <td>{item["tax-tax"]}</td>
                    </tr>
                ))}
            </TableBody>

            {/*<TableFooter>*/}
            {/*    <TableRow>*/}
            {/*        <TableHeaderCell colSpan='8'>*/}
            {/*            <Menu floated='right' pagination>*/}
            {/*                <MenuItem as='a' icon>*/}
            {/*                    <Icon name='chevron left' />*/}
            {/*                </MenuItem>*/}
            {/*                <MenuItem as='a'>1</MenuItem>*/}
            {/*                <MenuItem as='a'>2</MenuItem>*/}
            {/*                <MenuItem as='a'>3</MenuItem>*/}
            {/*                <MenuItem as='a'>4</MenuItem>*/}
            {/*                <MenuItem as='a' icon>*/}
            {/*                    <Icon name='chevron right' />*/}
            {/*                </MenuItem>*/}
            {/*            </Menu>*/}
            {/*        </TableHeaderCell>*/}
            {/*    </TableRow>*/}
            {/*</TableFooter>*/}
        </Table>
    );
}

export default TableViewTax;
