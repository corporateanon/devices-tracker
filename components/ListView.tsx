import moment from 'moment';
import React, { useMemo } from 'react';
import ReactDataGrid, { Column } from 'react-data-grid';
import { Telemetry, useGetTelemetriesQuery } from '../lib/generated/graphql';
import 'moment/locale/ru';

const columns: readonly Column<Telemetry>[] = [
    { key: 'id', name: 'ID' },
    { key: 'level', name: 'Уровень, %' },
    { key: 'battery', name: 'Аккумулятор, %' },
    {
        key: 'updatedAt',
        name: 'Онлайн',
        formatter({ row: { updatedAt } }) {
            return (
                <div title={moment(updatedAt).format('DD MMM YYYY HH:mm:ss')}>
                    {moment(updatedAt).fromNow()}
                </div>
            );
        },
    },
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
