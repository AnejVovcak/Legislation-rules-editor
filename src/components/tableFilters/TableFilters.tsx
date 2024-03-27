import {Dropdown} from "semantic-ui-react";
import {Tax} from "../../dtos/tax";

interface TableFilterProps {
    fieldsConfig: {fieldName: string,enumType: Record<string, string>}[];
    onFilterChange: (field: string, value: string| string[]) => void;
}

const TableFilter = ({ fieldsConfig, onFilterChange }: TableFilterProps) => {
    const getDropdownOptions = (enumObj: Record<string, string>) => {
        const values = Object.values(enumObj);
        return values.map(value => ({ key: value, text: value, value }));
    };

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px', // This adds some space between the dropdowns
        }}>
            {fieldsConfig.map((field) => (
                <Dropdown
                    placeholder={`Select ${field.fieldName}`}
                    selection
                    multiple
                    options={getDropdownOptions(field.enumType)}
                    onChange={(e, {value}) => onFilterChange(field.fieldName, value as string)}
                />
            ))}
        </div>
    );
};

export default TableFilter;