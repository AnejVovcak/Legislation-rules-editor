import {Table, TableBody, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {Tax} from "../../dtos/tax";
import {MongoRequest} from "../../dtos/mongo-request";
import {querySocSec, queryTax} from "../../api/api";
import {SocSec} from "../../dtos/socSec";

function TableViewSocSec() {
//data of type TaxEnum[] to store the fetched data
    const [data, setData] = useState<SocSec[]>([]);

    useEffect(() => {
        const getData = async () => {
            let request: MongoRequest = {
                dataSource: "LawBrainerTest",
                database: "lawBrainer",
                collection: "socSecStaging",
            }
            try {
                const result = await querySocSec(request); // Call the function from api.js
                setData(result); // Set the state with the fetched data
                console.log("Data fetched:", result[0])
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        getData();
    }, []); // Empty dependency array means this effect runs once on mount


    return (
        <div style={{overflowX: "auto",padding: 32}}>
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
                        <tr key={index}>
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