import {SocSec} from "../../../dtos/socSec";
import {TableBody} from "semantic-ui-react";
import React from "react";
import SemanticLabel from "./SemanticLabel";
import truncateHtml from "../../../utils/tableViewBodyUtil";

function SocSecBody({data, isProduction}: { data: SocSec[], isProduction: boolean }) {

    return (
        <TableBody>
            {data.map((item, index) => (
                <tr key={index} onClick={() =>
                    //isProduction ? {} : navigate(`/socSec/${item._id as string}`)}>
                    //open in new page
                    isProduction ? {} : window.open(`/socSec/${item._id as string}`, "_blank")}>
                    {/* Render table cells as per your data structure */}
                    <td>{item.title}</td>
                    {/*content is a html text, parse it to show it in a readable way*/}
                    <td dangerouslySetInnerHTML={{__html: truncateHtml(item.content, 500)}}/>
                    <td><SemanticLabel value={item.in_value}/></td>
                    <td><SemanticLabel value={item.out_value}/></td>
                    <td>{item.covered.map((covered, index) => (
                        <div style={{marginBottom: '5px'}}>
                            <SemanticLabel value={covered} key={index}/>
                        </div>
                    ))}</td>
                    <td>{item.article.map((article, index) => (
                        <div style={{marginBottom: '5px'}}>
                            <SemanticLabel value={article} key={index}/>
                        </div>
                    ))}</td>
                    <td>{item.statute.map((statue, index) => (
                        <div style={{marginBottom: '5px'}}>
                            <SemanticLabel value={statue} key={index}/>
                        </div>
                    ))}</td>
                    <td><SemanticLabel value={item.empl}/></td>
                    <td><SemanticLabel value={item.if_empl0_eq_empl1}/></td>
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
    )
}

export default SocSecBody;