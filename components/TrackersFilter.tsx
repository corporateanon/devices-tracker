import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { FC } from 'react';
import { HighLow, TelemetryFilter, YesNo } from '../lib/generated/graphql';

export const TrackersFilter: FC<{
    value: TelemetryFilter;
    onChange: (v: TelemetryFilter) => void;
}> = ({ value, onChange }) => {
    const handleChange = (field) => (_, val: string) => {
        const newValue = { ...value, [field]: val === '' ? null : val };
        onChange(newValue);
    };

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
                        уровень {'<'} 10%
                    </ToggleButton>
                    <ToggleButton value={HighLow.High}>
                        уровень {'>'} 90%
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
                        акк. {'<'} 10%
                    </ToggleButton>
                    <ToggleButton value={HighLow.High}>
                        акк. {'>'} 90%
                    </ToggleButton>
                    <ToggleButton value="">все</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
};
