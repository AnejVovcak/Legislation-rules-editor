import {Mig} from "../../../dtos/mig";
import React from "react";
import {TableBody} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

function MigBody({data, isProduction}: { data: Mig[], isProduction: boolean }) {

    const navigate = useNavigate(); // For navigation

    return (
        <TableBody>
            {data.map((item, index) => (
                <tr key={index} onClick={() =>
                    //isProduction ? {} : navigate(`/mig/${item._id as string}`)}>
                    //open in new page
                    isProduction   ? {} : window.open(`/mig/${item._id as string}`, "_blank")}>
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
    );
}

export default MigBody;