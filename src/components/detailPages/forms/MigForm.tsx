import {Mig} from "../../../dtos/mig";
import {FormGroup} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {CodebookValue} from "../../../enums/CodebookValue";
import DropdownSelect from "../../dropdown/DropdownSelect";

function MigForm({data, setData, fieldsConfig, onValidationChange,submitted}: {
    data: Mig,
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
                <><FormGroup inline widths='equal'>
                    <DropdownSelect
                        data={data}
                        setData={setData}
                        fieldKey="covered"
                        label="Covered"
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
                    <DropdownSelect
                        data={data}
                        setData={setData}
                        fieldKey="nat"
                        label="Nat"
                        fieldsConfig={fieldsConfig}
                        onErrorChange={setDropdownError}
                        submitted={submitted}
                    />
                    <DropdownSelect
                        data={data}
                        setData={setData}
                        fieldKey="out_title"
                        label="Out Title"
                        fieldsConfig={fieldsConfig}
                        onErrorChange={setDropdownError}
                        submitted={submitted}
                    />
                    <DropdownSelect
                        data={data}
                        setData={setData}
                        fieldKey="in_title"
                        label="In Title"
                        fieldsConfig={fieldsConfig}
                        onErrorChange={setDropdownError}
                        submitted={submitted}
                    />
                    <DropdownSelect
                        data={data}
                        setData={setData}
                        fieldKey="time"
                        label="Time"
                        multiple={true}
                        fieldsConfig={fieldsConfig}
                        onErrorChange={setDropdownError}
                        submitted={submitted}
                    />
                    <DropdownSelect
                        data={data}
                        setData={setData}
                        fieldKey="secondment"
                        label="Secondment"
                        fieldsConfig={fieldsConfig}
                        onErrorChange={setDropdownError}
                        submitted={submitted}
                    />
                    <DropdownSelect
                        data={data}
                        setData={setData}
                        fieldKey="platform_title"
                        label="Platform Title"
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

export default MigForm;
