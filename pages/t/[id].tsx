import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { InputProps } from '@material-ui/core/Input';
import { useRouter } from 'next/router';
import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useMap } from 'react-use';
import { ApplicationLayout } from '../../components/ApplicationLayout';
import { ContactSelect } from '../../components/ContactSelect';
import { TelemetryCard } from '../../components/TelemetryCard';
import {
    Telemetry,
    useGetTelemetryQuery,
    useSaveTelemetryMutation,
} from '../../lib/generated/graphql';

function getId(query: any) {
    return `${query.id}`;
}

const TelemetryPage: React.FC = () => {
    const { query } = useRouter();
    const id = getId(query);
    const { data } = useGetTelemetryQuery({
        fetchPolicy: 'cache-and-network',
        ssr: false,
        variables: { id },
    });
    const item = data?.getTelemetry;

    const [, { get, set, setAll }] = useMap<Pick<Telemetry, 'contactID'>>();
    useEffect(() => {
        item && setAll(item);
    }, [item, setAll]);
    const hangleContactIDChange: InputProps['onChange'] = useCallback(
        ({ target: { value } }) => set('contactID', value),
        [set]
    );

    const [saveTelemetry, { loading: saving }] = useSaveTelemetryMutation();

    const handleSaveClick = useCallback(() => {
        saveTelemetry({
            variables: {
                telemetry: {
                    _id: item._id,
                    contactID: get('contactID'),
                },
            },
        });
    }, [get, item, saveTelemetry]);

    return (
        <ApplicationLayout title={item?.deviceId ?? null}>
            <Grid container justify="center">
                <Box m={4} width="100%" maxWidth={600}>
                    <Paper>
                        <Box p={4}>
                            {data ? <TelemetryCard item={item} /> : null}
                            {item && (
                                <>
                                    <Grid container>
                                        <Grid item xs>
                                            <ContactSelect
                                                label="Контакт"
                                                fullWidth
                                                value={get('contactID') ?? ''}
                                                onChange={hangleContactIDChange}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box mt={2} textAlign="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSaveClick}
                                            disabled={saving}
                                        >
                                            Сохранить
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Paper>
                </Box>
            </Grid>
        </ApplicationLayout>
    );
};

export default TelemetryPage;
