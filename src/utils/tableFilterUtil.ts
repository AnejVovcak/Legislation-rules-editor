import {MongoRequest} from "../dtos/mongo-request";

interface FilterCriteria {
    [key: string]: { $in: string[] };
}

export function getRequestWithFilterAndSort(filters: Record<string, string[]>, column:  string | number | symbol, direction: 'ascending' | 'descending') {
    return {
        filter: Object.keys(filters).reduce<FilterCriteria>((acc, key) => {
            // For each filter, add its criterion to the request using $in
            acc[key] = {$in: filters[key]};
            return acc;
        }, {}),
        sort: {
            [column]: direction === 'ascending' ? 1 : -1
        }
    };
}

export function handleFilterChange(field: string, value: string | string[], setFilters: (value: React.SetStateAction<Record<string, string[]>>) => void) {
    setFilters(prevFilters => {
        // If the array is empty or the value is an empty string, remove the filter for this field
        if ((Array.isArray(value) && value.length === 0) || value === "") {
            const {[field]: _, ...remainingFilters} = prevFilters;
            return remainingFilters;
        }
        // Otherwise, update the filter for this field with the new value(s)
        return {...prevFilters, [field]: Array.isArray(value) ? value : [value]};
    });
}