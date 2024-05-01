import {TableBody} from "semantic-ui-react";
import React from "react";
import {Tax} from "../../../dtos/tax";
import SemanticLabel from "./SemanticLabel";

function TaxBody({data, isProduction}: { data: Tax[], isProduction: boolean }) {

    return (
        <TableBody>
            {data.map((item, index) => (
                <tr key={index} onClick={() =>
                    //isProduction ? {} : navigate(`/tax/${item._id as string}`)}>
                    //open in new page
                    isProduction   ? {} : window.open(`/tax/${item._id as string}`, "_blank")}>
                    {/* Render table cells as per your data structure */}
                    <td>{item.title}</td>
                    {/*content is a html text, parse it to show it in a readable way*/}
                    <td dangerouslySetInnerHTML={{__html: item.content}}/>
                    <td><SemanticLabel value={item.in_value}/></td>
                    <td><SemanticLabel value={item.out_value}/></td>
                    <td>{item.article.map((article, index) => (
                        <div style={{marginBottom: '5px'}}>
                            <SemanticLabel value={article} key={index}/>
                        </div>
                    ))}</td>
                    <td>{item.covered.map((covered, index) => (
                        <div style={{marginBottom: '5px'}}>
                            <SemanticLabel value={covered} key={index}/>
                        </div>
                    ))}</td>
                    <td><SemanticLabel value={item.empl}/></td>
                    <td><SemanticLabel value={item.tax}/></td>
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