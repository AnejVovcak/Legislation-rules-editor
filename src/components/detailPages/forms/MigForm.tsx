import {Mig} from "../../../dtos/mig";
import {FormGroup} from "semantic-ui-react";
import React from "react";
import {EnumValue} from "../../../enums/EnumValue";
import DropdownSelect from "../../dropdown/DropdownSelect";

function MigForm({data, setData, fieldsConfig}: {
    data: Mig,
    setData: React.Dispatch<React.SetStateAction<any>>,
    fieldsConfig: EnumValue[]
}) {

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
                        fieldKey="nat"
                        label="Nat"
                        fieldsConfig={fieldsConfig}
                    />
                    <DropdownSelect
                        data={data}
                        setData={setData}
                        fieldKey="out_title"
                        label="Out Title"
                        fieldsConfig={fieldsConfig}
                    />
                    <DropdownSelect
                        data={data}
                        setData={setData}
                        fieldKey="in_title"
                        label="In Title"
                        fieldsConfig={fieldsConfig}
                    />
                    <DropdownSelect
                        data={data}
                        setData={setData}
                        fieldKey="time"
                        label="Time"
                        multiple={true}
                        fieldsConfig={fieldsConfig}
                    />
                    <DropdownSelect
                        data={data}
                        setData={setData}
                        fieldKey="secondment"
                        label="Secondment"
                        fieldsConfig={fieldsConfig}
                    />
                </FormGroup>
                </>
            }
        </div>
    );

}

export default MigForm;
