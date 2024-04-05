
type TableData<T> = T[];

export function handleSort <T>(
    clickedColumn: keyof T,
    data: TableData<T>,
    setData: React.Dispatch<React.SetStateAction<TableData<T>>>,
    column: keyof T,
    setColumn: React.Dispatch<React.SetStateAction<keyof T>>,
    direction: 'ascending' | 'descending',
    setDirection: React.Dispatch<React.SetStateAction<'ascending' | 'descending'>>
) {
    if (column !== clickedColumn) {
        setColumn(clickedColumn);
        setData([...data].sort((a, b) => (a[clickedColumn]! > b[clickedColumn]!) ? 1 : -1));
        setDirection('ascending');
    } else {
        setData([...data].reverse());
        setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    }
};
