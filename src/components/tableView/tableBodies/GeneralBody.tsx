import {TableBody} from "semantic-ui-react";
import React from "react";
import SemanticLabel from "./SemanticLabel";
import truncateHtml from "../../../utils/tableViewBodyUtil";
import {General} from "../../../dtos/general";

function GeneralBody({data, isProduction}: { data: General[], isProduction: boolean }) {
    const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        if ((e.target as HTMLInputElement).type !== 'checkbox') {
            window.open(`general/${id}`, "_blank");
        }
    }

    return (
        <TableBody>
            {data.map((item, index) => (
                <tr key={index} onClick={(e) => !isProduction && handleRowClick(e, item._id as string)}>

                    {!isProduction && (
                        <td onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" id={item._id as string}/>
                        </td>
                    )}

                    <td>{item.title}</td>
                    {/*content is a html text, parse it to show it in a readable way*/}
                    <td dangerouslySetInnerHTML={{__html: truncateHtml(item.content, 500)}}/>
                    <td><SemanticLabel value={item.out_value}/></td>
                    <td><SemanticLabel value={item.in_value}/></td>
                    <td><SemanticLabel value={item.platform_title_general}/></td>
                    <td>{item.position?.map((time, index) => (
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
    )

}

export default GeneralBody;