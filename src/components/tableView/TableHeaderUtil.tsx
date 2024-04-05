import React from "react";
import { TableHeaderCell } from "semantic-ui-react";

type KeysOfType<T> = keyof T;

function renderTableHeaderCell<T>(
    label: string,
    key: KeysOfType<T>,
    column: KeysOfType<T>,
    direction: 'ascending' | 'descending',
    handleSortClick: (key: KeysOfType<T>) => () => void
) {
    return (
        <TableHeaderCell
            key={String(key)}
            sorted={column === key ? direction : undefined}
            onClick={handleSortClick(key)}
        >
            {label}
        </TableHeaderCell>
    );
}

export default renderTableHeaderCell;
