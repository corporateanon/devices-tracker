import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import qs from 'querystring';
import { FC, useCallback } from 'react';
import { TelemetryFilter } from '../lib/generated/graphql';
import { telemetryFiltersToQuery, queryToTelemetryFilters } from './filters/telemetryFilters';
import { TelemetryFilterView } from './TelemetryFilterView';

export const TelemetryToolbar: FC = () => {
    const { query, replace } = useRouter();
    const filters = queryToTelemetryFilters(query);
    const handleFiltersChange = useCallback(
        (value: TelemetryFilter) => {
            const q = { ...query, ...telemetryFiltersToQuery(value) };
            replace(`?${qs.stringify(q)}`);
        },
        [query, replace]
    );
    return (
        <Grid container direction="row" alignItems="flex-start">
            <Grid item xs>
                <TelemetryFilterView
                    value={filters}
                    onChange={handleFiltersChange}
                />
            </Grid>
        </Grid>
    );
};
