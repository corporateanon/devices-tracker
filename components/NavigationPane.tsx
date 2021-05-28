import { useRouter } from 'next/router';
import qs from 'querystring';
import { FC, useCallback } from 'react';
import { TelemetryFilter } from '../lib/generated/graphql';
import { filtersToQuery, queryToFilters } from './filters/filters';
import { TrackersFilter } from './TrackersFilter';

export const NavigationPane: FC = () => {
    const { query, replace } = useRouter();
    const filters = queryToFilters(query);
    const handleFiltersChange = useCallback((value: TelemetryFilter) => {
        const q = { ...query, ...filtersToQuery(value) };
        replace(`?${qs.stringify(q)}`);
    }, []);
    return (
        <div>
            <TrackersFilter value={filters} onChange={handleFiltersChange} />
        </div>
    );
};
