import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import qs from 'querystring';
import { FC, useCallback } from 'react';
import { TelemetryFilter } from '../lib/generated/graphql';
import { filtersToQuery, queryToFilters } from './filters/filters';
import { TrackersFilter } from './TrackersFilter';
import { UserMenu } from './UserMenu';

export const NavigationPane: FC = () => {
    const { query, replace } = useRouter();
    const filters = queryToFilters(query);
    const handleFiltersChange = useCallback((value: TelemetryFilter) => {
        const q = { ...query, ...filtersToQuery(value) };
        replace(`?${qs.stringify(q)}`);
    }, []);
    return (
        <Grid container direction="row" alignItems="flex-start">
            <Grid item xs>
                <TrackersFilter
                    value={filters}
                    onChange={handleFiltersChange}
                />
            </Grid>
            <Grid item>
                <UserMenu />
            </Grid>
        </Grid>
    );
};
