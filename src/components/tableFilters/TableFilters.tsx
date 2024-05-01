import {Dropdown} from "semantic-ui-react";
import {ReactNode} from "react";
import {SemanticColorUtil} from "../../utils/semanticColorUtil";

interface TableFilterProps {
    fieldsConfig: {fieldName: string,enumType: Record<string, string>}[];
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
                <div key={field.fieldName}
                     style={{minWidth: '200px'}}> {/* Ensure each dropdown and label are grouped and can wrap as a unit */}
                    <div style={{marginBottom: '5px'}}>{field.fieldName}</div> {/* Label */}
                    {/* Label */}
                    <Dropdown
                        selection
                        multiple
                        options={SemanticColorUtil.getDropdownOptions(field.enumType)}
                        onChange={(e, {value}) => onFilterChange(field.fieldName, value as string)}
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