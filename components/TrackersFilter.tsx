import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { FC } from 'react';
import {
    BATTERY_HIGH_FILTER_THRESHOLD,
    BATTERY_LOW_FILTER_THRESHOLD,
    LEVEL_HIGH_FILTER_THRESHOLD,
    LEVEL_LOW_FILTER_THRESHOLD,
} from '../lib/constants';
import { HighLow, TelemetryFilter, YesNo } from '../lib/generated/graphql';

export const TrackersFilter: FC<{
    value: TelemetryFilter;
    onChange: (v: TelemetryFilter) => void;
}> = ({ value, onChange }) => {
    const handleChange = (field) => (_, val: string) => {
        const newValue = { ...value, [field]: val === '' ? null : val };
        onChange(newValue);
    };

    const batteryLowText = `${Math.round(BATTERY_LOW_FILTER_THRESHOLD * 100)}%`;
    const batteryHighText = `${Math.round(
        BATTERY_HIGH_FILTER_THRESHOLD * 100
    )}%`;
    const levelLowText = `${Math.round(LEVEL_LOW_FILTER_THRESHOLD * 100)}%`;
    const levelHighText = `${Math.round(LEVEL_HIGH_FILTER_THRESHOLD * 100)}%`;

    return (
        <div>
            <div>
                <ToggleButtonGroup
                    exclusive
                    size="small"
                    value={value.level ?? ''}
                    onChange={handleChange('level')}
                >
                    <ToggleButton value={HighLow.Low}>
                        уровень {'<'} {levelLowText}
                    </ToggleButton>
                    <ToggleButton value={HighLow.High}>
                        уровень {'>'} {levelHighText}
                    </ToggleButton>
                    <ToggleButton value="">все</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                <ToggleButtonGroup
                    exclusive
                    size="small"
                    value={value.online ?? ''}
                    onChange={handleChange('online')}
                >
                    <ToggleButton value={YesNo.Yes}>онлайн</ToggleButton>
                    <ToggleButton value={YesNo.No}>оффлайн</ToggleButton>
                    <ToggleButton value="">все</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                <ToggleButtonGroup
                    exclusive
                    size="small"
                    value={value.battery ?? ''}
                    onChange={handleChange('battery')}
                >
                    <ToggleButton value={HighLow.Low}>
                        акк. {'<'} {batteryLowText}
                    </ToggleButton>
                    <ToggleButton value={HighLow.High}>
                        акк. {'>'} {batteryHighText}
                    </ToggleButton>
                    <ToggleButton value="">все</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
};
