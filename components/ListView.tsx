import React, { useMemo } from 'react';
import ReactDataGrid from 'react-data-grid';
import { useGetTelemetriesQuery } from '../lib/generated/graphql';

const columns = [
    { key: 'id', name: 'ID' },
    { key: 'level', name: 'Level' },
    { key: 'battery', name: 'Battery' },
    { key: 'updatedAt', name: 'Updated' },
];

export function ListView() {
    const { error, data, loading } = useGetTelemetriesQuery({
        pollInterval: 60000,
        ssr: false,
    });

    const rows = useMemo(() => {
        return data?.getTelemetries ?? [];
    }, [data]);

    return <ReactDataGrid columns={columns} rows={rows} />;
}
