import { useRouter } from 'next/router';
import React from 'react';
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
    if (!data) {
        return null;
    }
    return <div>{JSON.stringify(data)}</div>;
};

export default TelemetryPage;
