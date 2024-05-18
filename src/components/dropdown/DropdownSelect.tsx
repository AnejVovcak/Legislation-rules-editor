import {SemanticColorUtil} from "../../utils/semanticColorUtil";
import React, { SyntheticEvent} from "react";
import {DropdownProps, FormSelect} from "semantic-ui-react";
import {updateEnumObject} from "../../api/api";
import {EnumValue} from "../../enums/EnumValue";

type GenericData = { [key: string]: any }; // This type definition allows any key to be accessed.

type DropdownSelectProps = {
    data: GenericData,
    setData: React.Dispatch<React.SetStateAction<DropdownProps>>,
    fieldKey: string,
    label: string,
    multiple?: boolean,
    fieldsConfig: EnumValue[]
};

const DropdownSelect = ({ data, setData, fieldKey, label, multiple = false, fieldsConfig }: DropdownSelectProps) => {
    const options = SemanticColorUtil.getDropdownOptions(fieldsConfig, fieldKey);

    const handleAddition = ((event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        console.log("data.value", data.value)
        updateEnumObject(fieldKey, fieldsConfig.find((value) => value._id === fieldKey)!, data.value as string).then(() => {

        });
    });

    return (
        <FormSelect
            fluid
            search
            allowAdditions
            label={label}
            multiple={multiple}
            value={data[fieldKey] || (multiple ? [] : '')}
            options={options}
            onChange={(_e, {value}) => setData(prev => ({
                ...prev, [fieldKey]: multiple ? value : value  // TypeScript casting is unnecessary now
            }))}
            renderLabel={multiple ? (label) => ({
                color: label.color,
                content: label.text,
            }) : undefined}
            onAddItem={handleAddition}
        />
    );
};

export default DropdownSelect;