import React, {useEffect, useState} from "react";
import {Table, TableBody, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {queryTax} from "../../api/api";
import {MongoRequest} from "../../dtos/mongo-request";
import {Tax} from "../../dtos/tax";
import {useNavigate} from "react-router-dom";
import TableFilters from "../tableFilters/TableFilters";
import {CoveredEnum} from "../../enums/CoveredEnum";
import {ArticleEnum} from "../../enums/ArticleEnum";
import {InEnum} from "../../enums/InEnum";
import {OutEnum} from "../../enums/OutEnum";
import {EmplEnum} from "../../enums/EmplEnum";
import {TaxEnum} from "../../enums/TaxEnum";

function TableViewTax() {

    //data of type TaxEnum[] to store the fetched data
    const [data, setData] = useState<Tax[]>([]);
    const navigate = useNavigate(); // For navigation

    const fieldsConfig = [
        {fieldName:'tax-covered', enumType: CoveredEnum},
        {fieldName:'tax-article', enumType: ArticleEnum},
        {fieldName:'tax-in_value', enumType: InEnum},
        {fieldName:'tax-out_value', enumType: OutEnum},
        {fieldName:'tax-empl', enumType: EmplEnum},
        {fieldName:'tax-tax', enumType: TaxEnum}
    ]

    const request: MongoRequest = {
        dataSource: "LawBrainerTest",
        database: "lawBrainer",
        collection: "taxStaging",
    }


    useEffect(() => {
        const getData = async () => {
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

    //fun that reraoutes to detail page
    const handleRowClick = (id: string) => {
        console.log("ID:", id);
        // Redirect to the detail page
        navigate(`/tax/${id}`);
    };

    const handleFilterChange = (field: string, value: string|string[]) => {
        //create a copy of the request object
        const requestWithFilter = {...request};

        //add the filter to the request object (if the value is an array, it means that the filter is an enum)
        if(Array.isArray(value) && value.length > 0){
            requestWithFilter.filter = {...request.filter, [field]: {$in: value}}
        } else if(value !== ""){
            requestWithFilter.filter = {...request.filter, [field]: value}
        } else {
            //if the value is empty, remove the filter from the request object
            requestWithFilter.filter = {...request.filter};
        }

        //call the queryTax function with the new request object
        queryTax(requestWithFilter).then((result) => {
            setData(result);
        }).catch((error) => {
            console.error("Failed to fetch data:", error);
        });
    }

    return (
        <div>
            <TableFilters fieldsConfig={fieldsConfig}
                          onFilterChange={(field, value) => handleFilterChange(field, value)}/>

            <Table celled selectable>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Title</TableHeaderCell>
                        <TableHeaderCell>Text</TableHeaderCell>
                        <TableHeaderCell>COVERED</TableHeaderCell>
                        <TableHeaderCell>ARTICLE</TableHeaderCell>
                        <TableHeaderCell>IN</TableHeaderCell>
                        <TableHeaderCell>OUT</TableHeaderCell>
                        <TableHeaderCell>EMPL</TableHeaderCell>
                        <TableHeaderCell>TAX</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item._id as string)}>
                            {/* Render table cells as per your data structure */}
                            <td>{item.title}</td>
                            {/*content is a html text, parse it to show it in a readable way*/}
                            <td dangerouslySetInnerHTML={{__html: item.content}}/>
                            <td>{item["tax-covered"]}</td>
                            <td>{item["tax-article"]}</td>
                            <td>{item["tax-in_value"]}</td>
                            <td>{item["tax-out_value"]}</td>
                            <td>{item["tax-empl"]}</td>
                            <td>{item["tax-tax"]}</td>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableViewTax;
