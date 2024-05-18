import {Dropdown} from "semantic-ui-react";
import {ReactNode} from "react";
import {SemanticColorUtil} from "../../utils/semanticColorUtil";
import {EnumValue} from "../../enums/EnumValue";

interface TableFilterProps {
    fieldsConfig: EnumValue[];
    onFilterChange: (field: string, value: string| string[]) => void;
}

const TableFilter = ({ fieldsConfig, onFilterChange }: TableFilterProps) => {

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px', // This adds some space between the dropdowns
        }}>
            {fieldsConfig.map((field) => (
                <div key={field._id}
                     style={{minWidth: '200px'}}> {/* Ensure each dropdown and label are grouped and can wrap as a unit */}
                    <div style={{marginBottom: '5px'}}>{field._id}</div> {/* Label */}
                    {/* Label */}
                    <Dropdown
                        selection
                        multiple
                        search
                        options={SemanticColorUtil.getDropdownOptions(fieldsConfig, field._id)}
                        onChange={(e, {value}) => onFilterChange(field._id, value as string[])}
                        renderLabel={(label) => ({
                            color: label.color as string,
                            content: label.text as ReactNode,
                        })}
                    />
                </div>
            ))}
        </div>

    );
};

export default TableFilter;