import {useNavigate} from "react-router-dom";
import {TableBody} from "semantic-ui-react";
import React from "react";
import {Tax} from "../../../dtos/tax";

function TaxBody({data, isProduction}: { data: Tax[], isProduction: boolean }) {

    const navigate = useNavigate(); // For navigation

    return (
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
    )

}

export default TaxBody;