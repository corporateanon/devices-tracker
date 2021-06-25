import { useRouter } from 'next/router';
import React from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { TelemetryCard } from '../../components/TelemetryCard';
import { useGetTelemetryQuery } from '../../lib/generated/graphql';

function getId(query: object) {
    try {
        return atob((query as any).base64id);
    } catch (e) {
        return null;
    }
}

const TelemetryPage: React.FC = () => {
    const { query } = useRouter();
    const id = getId(query);
    const { data, error, loading } = useGetTelemetryQuery({
        variables: { id },
    });
    const item = data?.getTelemetry;
    return (
        <ApplicationLayout title={item?.id ?? null}>
            {data ? <TelemetryCard item={item} /> : null}
        </ApplicationLayout>
    );
};

export default TelemetryPage;
