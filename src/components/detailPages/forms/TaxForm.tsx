import React from "react";
import {FormGroup} from "semantic-ui-react";
import {Tax} from "../../../dtos/tax";
import {EnumValue} from "../../../enums/EnumValue";
import DropdownSelect from "../../dropdown/DropdownSelect";

function TaxForm({data, setData, fieldsConfig}: {
    data: Tax,
    setData: React.Dispatch<React.SetStateAction<any>>,
    fieldsConfig: EnumValue[]
}) {

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
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="article"
                            label="Article"
                            multiple={true}
                            fieldsConfig={fieldsConfig}
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="out_value"
                            label="Out"
                            fieldsConfig={fieldsConfig}
                        />
                    </FormGroup>
                    <FormGroup inline widths='equal'>
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="in_value"
                            label="In"
                            fieldsConfig={fieldsConfig}
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="empl"
                            label="Empl"
                            fieldsConfig={fieldsConfig}
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="tax"
                            label="Tax"
                            fieldsConfig={fieldsConfig}
                        />
                    </FormGroup>
                </>
            }
        </div>
    );
}

export default TaxForm;