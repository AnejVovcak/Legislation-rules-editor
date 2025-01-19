import {CodebookValue} from "../enums/CodebookValue";

export class SemanticColorUtil {
    static semanticColors = ["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "grey", "black"];

    static getColorIndex = (value: string) => {
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            hash = hash * 31 + value.charCodeAt(i);
            hash = hash % SemanticColorUtil.semanticColors.length;
        }
        return Math.abs(hash);
    };

    static getColorClass = (value: string) => {
        const colorIndex = SemanticColorUtil.getColorIndex(value);
        return `ui ${SemanticColorUtil.semanticColors[colorIndex]} label`;
    };

    static getDropdownOptionsUtil = (enumValues: string[]) => {
        // const values = Object.values(enumObj);
        return enumValues.map((value) => {
            const colorIndex = SemanticColorUtil.getColorIndex(value);
            return {
                key: value,
                text: value,
                value: value,
                color: SemanticColorUtil.semanticColors[colorIndex],
                label: {color: SemanticColorUtil.semanticColors[colorIndex], empty: true, circular: true},
            };
        });
    };

    static getDropdownOptions = (fieldsConfig: CodebookValue[], enumName: string) => {
        // const values = Object.values(enumObj);
        return SemanticColorUtil.getDropdownOptionsUtil(fieldsConfig.find(value => value._id === enumName)!.values);
    };
}