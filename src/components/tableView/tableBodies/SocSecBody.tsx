import {useNavigate} from "react-router-dom";
import {SocSec} from "../../../dtos/socSec";
import {TableBody} from "semantic-ui-react";
import React from "react";

function SocSecBody({data, isProduction}: { data: SocSec[], isProduction: boolean }) {

    return (
        <TableBody>
            {data.map((item, index) => (
                <tr key={index} onClick={() =>
                    //isProduction ? {} : navigate(`/socSec/${item._id as string}`)}>
                    //open in new page
                    isProduction   ? {} : window.open(`/socSec/${item._id as string}`, "_blank")}>
                    {/* Render table cells as per your data structure */}
                    <td>{item.title}</td>
                    {/*content is a html text, parse it to show it in a readable way*/}
                    <td dangerouslySetInnerHTML={{__html: item.content}}/>
                    <td>{item.in_value}</td>
                    <td>{item.out_value}</td>
                    <td>{item.covered.map((time, index) => (
                        <div key={index}>{time}</div>
                    ))}</td>
                    <td>{item.article.map((article, index) => (
                        <div key={index}>{article}</div>
                    ))}</td>
                    <td>{item.statute.map((time, index) => (
                        <div key={index}>{time}</div>
                    ))}</td>
                    <td>{item.empl}</td>
                    <td>{item.if_empl0_eq_empl1}</td>
                    <td>
                        <div>{item.last_modified_by}</div>
                        <div>{new Date(item.last_modified).toLocaleString()}</div>
                    </td>
                </tr>
            ))}
        </TableBody>
    )
}

export default SocSecBody;