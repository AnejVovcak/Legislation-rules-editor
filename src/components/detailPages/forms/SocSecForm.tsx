import React, {ReactNode} from "react";
import {FormGroup, FormSelect} from "semantic-ui-react";
import {SemanticColorUtil} from "../../../utils/semanticColorUtil";
import {SocSec} from "../../../dtos/socSec";
import {StatueEnum} from "../../../enums/StatueEnum";
import {EmplEnum} from "../../../enums/EmplEnum";
import {Empl0EQEmpl1Enum} from "../../../enums/Empl0EQEmpl1Enum";
import {CoveredEnum} from "../../../enums/CoveredEnum";
import {ArticleEnum} from "../../../enums/ArticleEnum";
import {OutEnum} from "../../../enums/OutEnum";
import {InEnum} from "../../../enums/InEnum";
import {EnumValue} from "../../../enums/EnumValue";

function SocSecForm({data, setData, fieldsConfig}: {
    data: SocSec,
    setData: React.Dispatch<React.SetStateAction<SocSec>>,
    fieldsConfig: EnumValue[]
}) {

    return (
        <div>
            {fieldsConfig && fieldsConfig.length > 0 &&
                <>
                    <FormGroup inline widths='equal'>
                        <FormSelect
                            fluid
                            multiple={true}
                            label='Covered'
                            value={data.covered || []}
                            options={SemanticColorUtil.getDropdownOptions(fieldsConfig,'covered')}
                            onChange={(e, {value}) =>
                                setData(prev => ({...prev, covered: value as CoveredEnum[]}))}
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
                            options={SemanticColorUtil.getDropdownOptions(fieldsConfig,'article')}
                            onChange={(e, {value}) =>
                                setData(prev => ({
                                    ...prev, article: value as ArticleEnum[]
                                }))}
                            renderLabel={(label) => ({
                                color: label.color as string,
                                content: label.text as ReactNode,
                            })}
                        />
                        <FormSelect
                            fluid
                            value={data.statute || []}
                            label='Statue'
                            multiple={true}
                            options={SemanticColorUtil.getDropdownOptions(fieldsConfig,'statue')}
                            onChange={(e, {value}) =>
                                setData(prev => ({
                                    ...prev, statute: value as StatueEnum[]
                                }))}
                            renderLabel={(label) => ({
                                color: label.color as string,
                                content: label.text as ReactNode,
                            })}
                        />
                    </FormGroup>
                    <FormGroup inline widths='equal'>
                        <FormSelect
                            fluid
                            value={data.out_value || ''}
                            label='Out'
                            options={SemanticColorUtil.getDropdownOptions(fieldsConfig,'out_value')}
                            onChange={(e, {value}) =>
                                setData(prev => ({
                                    ...prev, out_value: value as OutEnum
                                }))}
                        />
                        <FormSelect
                            fluid
                            value={data.in_value || ''}
                            label='In'
                            options={SemanticColorUtil.getDropdownOptions(fieldsConfig,'in_value')}
                            onChange={(e, {value}) => setData(prev => ({
                                ...prev, in_value: value as InEnum
                            }))}
                        />
                        < FormSelect
                            fluid
                            value={data.empl || ''}
                            label='Empl'
                            options={SemanticColorUtil.getDropdownOptions(fieldsConfig,'empl')}
                            onChange={(e, {value}) => setData(prev => ({
                                ...prev, empl: value as EmplEnum
                            }))}
                        />
                        <FormSelect
                            fluid
                            value={data.if_empl0_eq_empl1 || ''}
                            label='Empl0EQEmpl1Enum'
                            options={SemanticColorUtil.getDropdownOptions(fieldsConfig,'if_empl0_eq_empl1')}
                            onChange={(e, {value}) => setData(prev => ({
                                ...prev, if_empl0_eq_empl1: value as Empl0EQEmpl1Enum
                            }))}
                        />
                    </FormGroup>
                </>
            }
        </div>
    );
}

export default SocSecForm;