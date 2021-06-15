import { Grid, makeStyles, MenuItem, TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ChangeEvent, FC } from 'react';
import {
    BATTERY_HIGH_FILTER_THRESHOLD,
    BATTERY_LOW_FILTER_THRESHOLD,
    LEVEL_HIGH_FILTER_THRESHOLD,
    LEVEL_LOW_FILTER_THRESHOLD,
} from '../lib/constants';
import { HighLow, TelemetryFilter, YesNo } from '../lib/generated/graphql';

const useStyles = makeStyles((theme) => ({
    filterItem: {
        width: theme.spacing(20),
    },
}));

export const TrackersFilter: FC<{
    value: TelemetryFilter;
    onChange: (v: TelemetryFilter) => void;
}> = ({ value, onChange }) => {
    const classes = useStyles();

    const handleChange = (field) => (event: ChangeEvent<HTMLInputElement>) => {
        const v = event.target.value;
        const newValue = { ...value, [field]: v === 'not_selected' ? null : v };
        onChange(newValue);
    };

    const batteryLowText = `${Math.round(BATTERY_LOW_FILTER_THRESHOLD * 100)}%`;
    const batteryHighText = `${Math.round(
        BATTERY_HIGH_FILTER_THRESHOLD * 100
    )}%`;
    const levelLowText = `${Math.round(LEVEL_LOW_FILTER_THRESHOLD * 100)}%`;
    const levelHighText = `${Math.round(LEVEL_HIGH_FILTER_THRESHOLD * 100)}%`;

    return (
        <Grid container spacing={1}>
            <Grid item>
                <TextField
                    className={classes.filterItem}
                    select
                    value={value.level ?? 'not_selected'}
                    onChange={handleChange('level')}
                    label="Уровень"
                >
                    <MenuItem value="not_selected">не выбран</MenuItem>
                    <MenuItem value={HighLow.Low}>
                        {'<'} {levelLowText}
                    </MenuItem>
                    <MenuItem value={HighLow.High}>
                        {'>'} {levelHighText}
                    </MenuItem>
                </TextField>
            </Grid>
            <Grid item>
                <TextField
                    className={classes.filterItem}
                    select
                    label="Статус"
                    value={value.online ?? 'not_selected'}
                    onChange={handleChange('online')}
                >
                    <MenuItem value="not_selected">не выбран</MenuItem>
                    <MenuItem value={YesNo.Yes}>онлайн</MenuItem>
                    <MenuItem value={YesNo.No}>оффлайн</MenuItem>
                </TextField>
            </Grid>
            <Grid item>
                <TextField
                    className={classes.filterItem}
                    select
                    label="Заряд"
                    value={value.battery ?? 'not_selected'}
                    onChange={handleChange('battery')}
                >
                    <MenuItem value="not_selected">не выбран</MenuItem>
                    <MenuItem value={HighLow.Low}>
                        {'<'} {batteryLowText}
                    </MenuItem>
                    <MenuItem value={HighLow.High}>
                        {'>'} {batteryHighText}
                    </MenuItem>
                </TextField>
            </Grid>
        </Grid>
    );
};
