
type TableData<T> = T[];

export function handleSort <T>(
    clickedColumn: keyof T,
    data: TableData<T>,
    column: keyof T,
    setColumn: React.Dispatch<React.SetStateAction<keyof T>>,
    direction: 'ascending' | 'descending',
    setDirection: React.Dispatch<React.SetStateAction<'ascending' | 'descending'>>,
    initialSort ?: boolean
):TableData<T> {
    if (column !== clickedColumn || initialSort) {
        setColumn(clickedColumn);
        //sort data using compareVersionStrings function
        //return sorted data
        return [...data].sort((a, b) => compareVersionStrings(a[clickedColumn], b[clickedColumn]));
    } else {
        //if column is the same as clickedColumn, reverse the order
        setDirection(direction === 'ascending' ? 'descending' : 'ascending');
        //return reversed data
        return [...data].reverse();
    }
}

function compareVersionStrings(a: any, b: any): number {
    const partsA = a.toString().split('.');
    const partsB = b.toString().split('.');
    const length = Math.max(partsA.length, partsB.length);

    for (let i = 0; i < length; i++) {
        const numA = parseInt(partsA[i], 10);
        const numB = parseInt(partsB[i], 10);
        
        // Compare numbers first
        if (!isNaN(numA) && !isNaN(numB)) {
            if (numA > numB) return 1;
            if (numA < numB) return -1;
        }
        // if one is empty it should come first
        if (partsA[i] === undefined) return -1;
        if (partsB[i] === undefined) return 1;

        // numA is a number but numB is a string, numA should come first
        if (!isNaN(numA) && isNaN(numB)) return 1;
        // numB is a number but numA is a string, numB should come first
        if (isNaN(numA) && !isNaN(numB)) return -1;

        // Both are strings, compare as strings
        const strA = partsA[i] || '';
        const strB = partsB[i] || '';
        //test print out
        if (strA > strB) return 1;
        if (strA < strB) return -1;
    }
    
    // If all parts are equal
    return 0;
}