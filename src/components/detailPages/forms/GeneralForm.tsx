import React, {useEffect, useState} from "react";
import {FormGroup} from "semantic-ui-react";
import {CodebookValue} from "../../../enums/CodebookValue";
import DropdownSelect from "../../dropdown/DropdownSelect";
import {General} from "../../../dtos/general";

function GeneralForm({data, setData, fieldsConfig, onValidationChange, submitted}: {
    data: General,
    setData: React.Dispatch<React.SetStateAction<any>>,
    fieldsConfig: CodebookValue[],
    onValidationChange: (isValid: boolean) => void
    submitted: boolean
}) {

    const [dropdownErrors, setDropdownErrors] = useState(new Map<string, boolean>());

    useEffect(() => {
        onValidationChange(Array.from(dropdownErrors.values()).every(value => !value));
    }, [data, dropdownErrors]);

    function setDropdownError(fieldKey: string,hasError: boolean,) {
        setDropdownErrors(prev => {
            return prev.set(fieldKey, hasError);
        });
    }

    return (
        <div>
            {fieldsConfig && fieldsConfig.length > 0 &&
                <>
                    <FormGroup inline widths='equal'>
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="out_value"
                            label="Out"
                            fieldsConfig={fieldsConfig}
                            onErrorChange={setDropdownError}
                            submitted={submitted}
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="in_value"
                            label="In"
                            fieldsConfig={fieldsConfig}
                            onErrorChange={setDropdownError}
                            submitted={submitted}
                        />
                    </FormGroup>
                </>
            }
        </div>
    );
}

export default GeneralForm;