import { ContactFilter } from '../../lib/generated/graphql';

enum QueryParams {
    Archived = 'a',
}

interface Query {
    [key: string]: string | string[];
}

export function contactFiltersToQuery(filters: ContactFilter): Query {
    const q: Query = {
        [QueryParams.Archived]: filters.archived ? 'YES' : 'NO',
    };
    return q;
}

export function queryToContactFilters(q: Query): ContactFilter {
    const f: ContactFilter = {
        archived: q[QueryParams.Archived] === 'YES',
    };
    return f;
}
