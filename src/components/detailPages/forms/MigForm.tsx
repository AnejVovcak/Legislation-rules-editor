import {Mig} from "../../../dtos/mig";
import {FormGroup, FormSelect} from "semantic-ui-react";
import {SemanticColorUtil} from "../../../utils/semanticColorUtil";
import {OutTitleEnum} from "../../../enums/OutTitleEnum";
import {InTitleEnum} from "../../../enums/InTitleEnum";
import {MigTimeEnum} from "../../../enums/MigTimeEnum";
import React, {ReactNode} from "react";
import {SecondmentEnum} from "../../../enums/SecondmentEnum";
import {NatEnum} from "../../../enums/NatEnum";
import {CoveredEnum} from "../../../enums/CoveredEnum";
import {ArticleEnum} from "../../../enums/ArticleEnum";
import {OutEnum} from "../../../enums/OutEnum";
import {InEnum} from "../../../enums/InEnum";

function MigForm({data, setData}: { data: Mig, setData:  React.Dispatch<React.SetStateAction<Mig>> }) {

    return (
        <div>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    label='Covered'
                    value={data.covered || ''}
                    options={SemanticColorUtil.getDropdownOptions(CoveredEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, covered: value as CoveredEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.article || []}
                    label='Article'
                    multiple={true}
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
                    label='In Value'
                    value={data.in_value || ''}
                    options={SemanticColorUtil.getDropdownOptions(InEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, in_value: value as InEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.out_title || ''}
                    label='Out Title'
                    options={SemanticColorUtil.getDropdownOptions(OutTitleEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev,
                        out_title: value as OutTitleEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.in_title || ''}
                    label='In Title'
                    options={SemanticColorUtil.getDropdownOptions(InTitleEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, in_title: value as InTitleEnum
                    }))}
                />
            </FormGroup>
            <FormGroup inline widths='equal'>
                <FormSelect
                    fluid
                    multiple={true}
                    value={data.time || []}
                    label='Time'
                    options={SemanticColorUtil.getDropdownOptions(MigTimeEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, time: value as MigTimeEnum[]
                    }))}
                    renderLabel={(label) => ({
                        color: label.color as string,
                        content: label.text as ReactNode,
                    })}
                />
                <FormSelect
                    fluid
                    value={data.secondment || ''}
                    label='Secondment'
                    options={SemanticColorUtil.getDropdownOptions(SecondmentEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev,
                        secondment: value as SecondmentEnum
                    }))}
                />
                <FormSelect
                    fluid
                    value={data.nat || ''}
                    label='Nat'
                    options={SemanticColorUtil.getDropdownOptions(NatEnum)}
                    onChange={(e, {value}) => setData(prev => ({
                        ...prev, nat: value as NatEnum
                    }))}
                />
            </FormGroup>
        </div>
    );

}

export default MigForm;
