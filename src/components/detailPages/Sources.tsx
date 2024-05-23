import React from 'react';
import {Button, FormField, FormGroup, FormInput, FormSelect, Radio} from "semantic-ui-react";
import {Source} from "../../dtos/entity";
import {SourceTrackingEnum} from "../../enums/SourceTrackingEnum";
import {SemanticColorUtil} from "../../utils/semanticColorUtil";
import {EnumValue} from "../../enums/EnumValue";

type SourceFieldTypes = keyof Source;

const SourcesInput = ({sources, setSources, sourceEnum}: {
    sources: Source[],
    setSources: (sources: Source[]) => void,
    sourceEnum: EnumValue
}) => {
    const handleSourceChange = <T extends SourceFieldTypes>(index: number, field: T, value: Source[T]) => {
        const newSources = [...sources];
        newSources[index][field] = value;
        setSources(newSources);
    };


    const addSource = () => {
        const newSource: Source = {
            source: '',
            xpath: '',
            md5_hash: '',
            type: SourceTrackingEnum.OFFICIAL_WEBSITE,
            validated: true
        };
        const newSources = [...sources, newSource];
        setSources(newSources);
    };

    const removeSource = (index: number) => {
        const newSources = [...sources];
        newSources.splice(index, 1);
        setSources(newSources);
    };

    return (
        <div style={{marginBottom: '20px'}}>
            {sourceEnum && sources.map((source, index) => (
                <FormGroup key={index} widths='equal'
                           style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <FormInput
                        label="Source"
                        placeholder="Source"
                        value={source.source}
                        onChange={e => handleSourceChange(index, 'source', e.target.value)}
                    />
                    <FormInput
                        label="XPath"
                        placeholder="XPath"
                        value={source.xpath}
                        onChange={e => handleSourceChange(index, 'xpath', e.target.value)}
                    />
                    <FormSelect
                        fluid
                        label='Type'
                        value={source.type || ''}
                        options={SemanticColorUtil.getDropdownOptions([sourceEnum], 'source')}
                        onChange={(e, {value}) => handleSourceChange(index, 'type', value as SourceTrackingEnum)}
                    />
                    <FormField>
                        <Radio toggle
                               label='Validated'
                               checked={source.validated}
                               onChange={() => handleSourceChange(index, 'validated', !source.validated)}
                        />
                    </FormField>
                    <Button type="button" onClick={() => removeSource(index)}>-</Button>
                </FormGroup>
            ))}
            <Button type="button" onClick={addSource}>Add Source</Button>
        </div>
    );
};

export default SourcesInput;
