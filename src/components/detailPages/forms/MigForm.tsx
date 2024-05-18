import {Mig} from "../../../dtos/mig";
import {FormGroup, FormSelect} from "semantic-ui-react";
import {SemanticColorUtil} from "../../../utils/semanticColorUtil";
import {OutTitleEnum} from "../../../enums/OutTitleEnum";
import {InTitleEnum} from "../../../enums/InTitleEnum";
import {MigTimeEnum} from "../../../enums/MigTimeEnum";
import React, {ReactNode, useEffect} from "react";
import {SecondmentEnum} from "../../../enums/SecondmentEnum";
import {NatEnum} from "../../../enums/NatEnum";
import {CoveredEnum} from "../../../enums/CoveredEnum";
import {ArticleEnum} from "../../../enums/ArticleEnum";
import {OutEnum} from "../../../enums/OutEnum";
import {InEnum} from "../../../enums/InEnum";
import {EnumValue} from "../../../enums/EnumValue";

function MigForm({data, setData, fieldsConfig}: {
    data: Mig,
    setData: React.Dispatch<React.SetStateAction<Mig>>,
    fieldsConfig: EnumValue[]
}) {


    return (
        <div>
            {fieldsConfig && fieldsConfig.length > 0 &&
                <><FormGroup inline widths='equal'>
                    <FormSelect
                        fluid
                        label='Covered'
                        value={data.covered || ''}
                        options={SemanticColorUtil.getDropdownOptions(fieldsConfig, 'covered')}
                        onChange={(e, {value}) => setData(prev => ({
                            ...prev, covered: value as CoveredEnum
                        }))}/>
                    <FormSelect
                        fluid
                        value={data.article || []}
                        label='Article'
                        multiple={true}
                        options={SemanticColorUtil.getDropdownOptions(fieldsConfig, 'article')}
                        onChange={(e, {value}) => setData(prev => ({
                            ...prev, article: value as ArticleEnum[]
                        }))}
                        renderLabel={(label) => ({
                            color: label.color as string,
                            content: label.text as ReactNode,
                        })}/>
                    <FormSelect
                        fluid
                        value={data.out_value || ''}
                        label='Out'
                        options={SemanticColorUtil.getDropdownOptions(fieldsConfig, 'out_value')}
                        onChange={(e, {value}) => setData(prev => ({
                            ...prev, out_value: value as OutEnum
                        }))}/>
                </FormGroup><FormGroup inline widths='equal'>
                    <FormSelect
                        fluid
                        label='In'
                        value={data.in_value || ''}
                        options={SemanticColorUtil.getDropdownOptions(fieldsConfig, 'in_value')}
                        onChange={(e, {value}) => setData(prev => ({
                            ...prev, in_value: value as InEnum
                        }))}/>
                    <FormSelect
                        fluid
                        value={data.out_title || ''}
                        label='OutTitle'
                        options={SemanticColorUtil.getDropdownOptions(fieldsConfig, 'out_title')}
                        onChange={(e, {value}) => setData(prev => ({
                            ...prev,
                            out_title: value as OutTitleEnum
                        }))}/>
                    <FormSelect
                        fluid
                        value={data.in_title || ''}
                        label='InTitle'
                        options={SemanticColorUtil.getDropdownOptions(fieldsConfig, 'in_title')}
                        onChange={(e, {value}) => setData(prev => ({
                            ...prev, in_title: value as InTitleEnum
                        }))}/>
                </FormGroup><FormGroup inline widths='equal'>
                    <FormSelect
                        fluid
                        multiple={true}
                        value={data.time || []}
                        label='Time'
                        options={SemanticColorUtil.getDropdownOptions(fieldsConfig, 'time')}
                        onChange={(e, {value}) => setData(prev => ({
                            ...prev, time: value as MigTimeEnum[]
                        }))}
                        renderLabel={(label) => ({
                            color: label.color as string,
                            content: label.text as ReactNode,
                        })}/>
                    <FormSelect
                        fluid
                        value={data.secondment || ''}
                        label='Secondment'
                        options={SemanticColorUtil.getDropdownOptions(fieldsConfig, 'secondment')}
                        onChange={(e, {value}) => setData(prev => ({
                            ...prev,
                            secondment: value as SecondmentEnum
                        }))}/>
                    <FormSelect
                        fluid
                        value={data.nat || ''}
                        label='Nat'
                        options={SemanticColorUtil.getDropdownOptions(fieldsConfig, 'nat')}
                        onChange={(e, {value}) => setData(prev => ({
                            ...prev, nat: value as NatEnum
                        }))}/>
                </FormGroup></>
            }
        </div>
    );

}

export default MigForm;
