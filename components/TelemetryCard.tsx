import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import React, { FC, ReactNode } from 'react';
import { percentFormatter } from '../lib/formatters';
import { Telemetry } from '../lib/generated/graphql';

const Row: FC<{ k: string; v: ReactNode }> = ({ k, v }) => {
    return (
        <Box>
            <Box>{k}</Box>
            <Box>{v}</Box>
        </Box>
    );
};

const Progress: FC<{ value: number }> = ({ value }) => {
    return (
        <Box display="flex" flexWrap="nowrap" alignItems="center">
            <progress value={value} max={1} /> {percentFormatter.format(value)}
        </Box>
    );
};

export const TelemetryCard: React.FC<{ item: Telemetry }> = ({ item }) => {
    return (
        <Grid container direction="column">
            <Row k="ID устройства" v={item.deviceId} />
            <Row k="Батарея" v={<Progress value={item.battery} />} />
            <Row k="Уровень" v={<Progress value={item.level} />} />
        </Grid>
    );
};
