import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import React, { FC, ReactNode } from 'react';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { percentFormatter } from '../../lib/formatters';
import { useGetTelemetryQuery } from '../../lib/generated/graphql';

function getId(query: object) {
    try {
        return atob((query as any).base64id);
    } catch (e) {
        return null;
    }
}

const Row: FC<{ k: string; v: ReactNode }> = ({ k, v }) => {
    return (
        <Grid container>
            <Grid xs={3} sm={2}>
                <Typography variant="body1">{k}</Typography>
            </Grid>
            <Grid xs={9} sm={10}>
                <Typography variant="body1">{v}</Typography>
            </Grid>
        </Grid>
    );
};

const TelemetryPage: React.FC = () => {
    const { query } = useRouter();
    const id = getId(query);
    const { data, error, loading } = useGetTelemetryQuery({
        variables: { id },
    });
    if (!data) {
        return null;
    }
    const item = data.getTelemetry;
    return (
        <ApplicationLayout title={`${item.id}`}>
            <Grid container direction="column">
                <Row k="ID" v={item.id} />
                <Row
                    k="Батарея"
                    v={
                        <>
                            <progress value={item.battery} max={1} />{' '}
                            {percentFormatter.format(item.battery)}
                        </>
                    }
                />
                <Row
                    k="Уровень"
                    v={
                        <>
                            <progress value={item.level} max={1} />{' '}
                            {percentFormatter.format(item.level)}
                        </>
                    }
                />
            </Grid>
        </ApplicationLayout>
    );
};

export default TelemetryPage;
