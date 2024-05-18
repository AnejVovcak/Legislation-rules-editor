import React from "react";
import {FormGroup} from "semantic-ui-react";
import {SocSec} from "../../../dtos/socSec";
import {EnumValue} from "../../../enums/EnumValue";
import DropdownSelect from "../../dropdown/DropdownSelect";

function SocSecForm({data, setData, fieldsConfig}: {
    data: SocSec,
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
                            fieldKey="statute"
                            label="Statute"
                            multiple={true}
                            fieldsConfig={fieldsConfig}
                        />
                    </FormGroup>
                    <FormGroup inline widths='equal'>
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="out_value"
                            label="Out Value"
                            fieldsConfig={fieldsConfig}
                        />
                        <DropdownSelect
                            data={data}
                            setData={setData}
                            fieldKey="in_value"
                            label="In Value"
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
                            fieldKey="if_empl0_eq_empl1"
                            label="If Empl0 Eq Empl1"
                            fieldsConfig={fieldsConfig}
                        />
                    </FormGroup>
                </>
            }
        </div>
    );
}

export default SocSecForm;