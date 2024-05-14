import React, {ReactNode} from "react";
import {FormGroup, FormSelect} from "semantic-ui-react";
import {SemanticColorUtil} from "../../../utils/semanticColorUtil";
import {EmplEnum} from "../../../enums/EmplEnum";
import {CoveredEnum} from "../../../enums/CoveredEnum";
import {ArticleEnum} from "../../../enums/ArticleEnum";
import {OutEnum} from "../../../enums/OutEnum";
import {InEnum} from "../../../enums/InEnum";
import {Tax} from "../../../dtos/tax";
import {TaxEnum} from "../../../enums/TaxEnum";

function TaxForm({data, setData}: { data: Tax, setData: React.Dispatch<React.SetStateAction<Tax>> }) {

    return (
        <div>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    multiple={true}
                    label='Covered'
                    value={data.covered || []}
                    options={SemanticColorUtil.getDropdownOptions(CoveredEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, covered: value as CoveredEnum[]
                    }))}
                    renderLabel={(label) => ({
                        color: label.color as string,
                        content: label.text as ReactNode,
                    })}
                />
                <FormSelect
                    fluid
                    label='Article'
                    multiple={true}
                    value={data.article || []}
                    options={SemanticColorUtil.getDropdownOptions(ArticleEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, article: value as ArticleEnum[]
                    }))}
                    renderLabel={(label) => ({
                        color: label.color as string,
                        content: label.text as ReactNode,
                    })}
                />
                <FormSelect
                    fluid
                    value={data.out_value || ''}
                    label='Out Value'
                    options={SemanticColorUtil.getDropdownOptions(OutEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, out_value: value as OutEnum
                    }))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    value={data.in_value || ''}
                    label='In Value'
                    options={SemanticColorUtil.getDropdownOptions(InEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, in_value: value as InEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.empl || ''}
                    label='Empl'
                    options={SemanticColorUtil.getDropdownOptions(EmplEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, empl: value as EmplEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.tax || ''}
                    label='Tax'
                    options={SemanticColorUtil.getDropdownOptions(TaxEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, tax: value as TaxEnum
                    }))}
                />
            </FormGroup>
        </div>
    );
}

export default TaxForm;