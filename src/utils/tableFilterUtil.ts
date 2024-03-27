import {MongoRequest} from "../dtos/mongo-request";

interface FilterCriteria {
    [key: string]: { $in: string[] };
}
export function getRequestWithFilter(request: MongoRequest, filters: Record<string, string[]>) {
    return {
        ...request, // Your base request object
        filter: Object.keys(filters).reduce<FilterCriteria>((acc, key) => {
            // For each filter, add its criterion to the request using $in
            acc[key] = {$in: filters[key]};
            return acc;
        }, {})
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