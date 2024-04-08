import React from 'react';
import {Button, FormGroup, FormInput} from "semantic-ui-react";
import {Source} from "../../dtos/entity";

const SourcesInput = ({sources, setSources}: { sources: Source[], setSources: (sources: Source[]) => void }) => {
    const handleSourceChange = (index: number, field: keyof Source, value: string) => {
        const newSources = [...sources];
        newSources[index][field] = value;
        setSources(newSources);
    };

    const addSource = () => {
        const newSource: Source = {source: '', xpath: '', md5_hash: ''};
        const newSources = [...sources, newSource];
        setSources(newSources);
    };

    const removeSource = (index: number) => {
        const newSources = [...sources];
        newSources.splice(index, 1);
        setSources(newSources);
    };

    return (
        <>
            {sources.map((source: Source, index: number) => (
                <FormGroup key={index} widths='equal'>
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
                    <Button
                        type="button"
                        onClick={() => removeSource(index)}
                    >-</Button>
                </FormGroup>
            ))}
            <Button type="button" onClick={addSource}>Add Source</Button>
        </>
    );
};

export default SourcesInput;
