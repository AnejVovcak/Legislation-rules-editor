import React, {useEffect, useState} from "react";
import {FormGroup} from "semantic-ui-react";
import {SocSec} from "../../../dtos/socSec";
import {CodebookValue} from "../../../enums/CodebookValue";
import DropdownSelect from "../../dropdown/DropdownSelect";

function SocSecForm({data, setData, fieldsConfig, onValidationChange, submitted}: {
    data: SocSec,
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
                            fieldKey="covered"
                            label="Covered"
                            multiple={true}
                            fieldsConfig={fieldsConfig}
                            onErrorChange={setDropdownError}
                            submitted={submitted}
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="article"
                            label="Article"
                            multiple={true}
                            fieldsConfig={fieldsConfig}
                            onErrorChange={setDropdownError}
                            submitted={submitted}
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="statute"
                            label="Statute"
                            multiple={true}
                            fieldsConfig={fieldsConfig}
                            onErrorChange={setDropdownError}
                            submitted={submitted}
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="out_value"
                            label="Out Value"
                            fieldsConfig={fieldsConfig}
                            onErrorChange={setDropdownError}
                            submitted={submitted}
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="in_value"
                            label="In Value"
                            fieldsConfig={fieldsConfig}
                            onErrorChange={setDropdownError}
                            submitted={submitted}
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="empl"
                            label="Empl"
                            fieldsConfig={fieldsConfig}
                            onErrorChange={setDropdownError}
                            submitted={submitted}
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="if_empl0_eq_empl1"
                            label="If Empl0 Eq Empl1"
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

export default SocSecForm;