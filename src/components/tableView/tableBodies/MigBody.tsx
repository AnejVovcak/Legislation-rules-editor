import {Mig} from "../../../dtos/mig";
import React from "react";
import {TableBody} from "semantic-ui-react";
import SemanticLabel from "./SemanticLabel";
import truncateHtml from "../../../utils/tableViewBodyUtil";

function MigBody({data, isProduction}: { data: Mig[], isProduction: boolean }) {
    return (
        <TableBody>
            {data.map((item, index) => (
                <tr key={index} onClick={() =>
                    //isProduction ? {} : navigate(`/mig/${item._id as string}`)}>
                    //open in new page
                    isProduction ? {} : window.open(`/mig/${item._id as string}`, "_blank")}>
                    {/* Render table cells as per your data structure */}
                    <td>{item.title}</td>
                    {/*content is a html text, parse it to show it in a readable way*/}
                    <td dangerouslySetInnerHTML={{__html: truncateHtml(item.content,500)}}/>
                    <td><SemanticLabel value={item.in_value}/></td>
                    <td><SemanticLabel value={item.out_value}/></td>
                    <td>{item.article.map((article, index) => (
                        <div style={{marginBottom: '5px'}}>
                            <SemanticLabel value={article} key={index}/>
                        </div>
                    ))}</td>
                    <td><SemanticLabel value={item.covered}/></td>
                    <td><SemanticLabel value={item.in_title}/></td>
                    <td><SemanticLabel value={item.nat}/></td>
                    <td><SemanticLabel value={item.out_title}/></td>
                    <td><SemanticLabel value={item.secondment}/></td>
                    <td>{item.time.map((time, index) => (
                        <div style={{marginBottom: '5px'}}>
                            <SemanticLabel value={time} key={index}/>
                        </div>
                    ))}</td>
                    <td>
                        <div>{item.last_modified_by}</div>
                        <div>{new Date(item.last_modified).toLocaleString()}</div>
                    </td>
                    <td>
                        {/*emojis from https://emojipedia.org/*/}
                        {item.published ? '✅' : '❌'}
                    </td>
                </tr>
            ))}
        </TableBody>
    );
}

export default MigBody;