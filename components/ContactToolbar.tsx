import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import qs from 'querystring';
import { FC, useCallback } from 'react';
import { ContactFilter } from '../lib/generated/graphql';
import { ContactFilterView } from './ContactFilterView';
import {
    contactFiltersToQuery,
    queryToContactFilters,
} from './filters/contactFilters';

export const ContactToolbar: FC = () => {
    const { query, replace } = useRouter();
    const filters = queryToContactFilters(query);
    const handleFiltersChange = useCallback(
        (value: ContactFilter) => {
            const q = { ...query, ...contactFiltersToQuery(value) };
            replace(`?${qs.stringify(q)}`);
        },
        [query, replace]
    );
    return (
        <Grid container direction="row" alignItems="flex-start">
            <Grid item xs>
                <ContactFilterView
                    value={filters}
                    onChange={handleFiltersChange}
                />
            </Grid>
        </Grid>
    );
};
