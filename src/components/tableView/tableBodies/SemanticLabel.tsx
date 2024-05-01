import React from 'react';
import {SemanticColorUtil} from "../../../utils/semanticColorUtil";

const SemanticLabel = ({value}: { value: string }) => {

    return (
        <div className = {SemanticColorUtil.getColorClass(value)} >
            {value}
        </div>
    );
};

export default SemanticLabel;