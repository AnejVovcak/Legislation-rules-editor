export class SemanticColorUtil{
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

    static getDropdownOptions = (enumObj: Record<string, string>) => {
        const values = Object.values(enumObj);
        return values.map((value) => {
            const colorIndex = SemanticColorUtil.getColorIndex(value);
            return {
                key: value,
                text: value,
                value: value,
                color: SemanticColorUtil.semanticColors[colorIndex],
                label: { color: SemanticColorUtil.semanticColors[colorIndex], empty: true, circular: true },
            };
        });
    };
}