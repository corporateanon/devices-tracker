import { Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { FC } from 'react';

export const TrackersFilter: FC = () => {
    return (
        <div>
            <div>
                <ToggleButtonGroup size="small">
                    <ToggleButton value="level:low">
                        уровень {'<'} 10%
                    </ToggleButton>
                    <ToggleButton value="level:high">   
                        уровень {'>'} 90%
                    </ToggleButton>
                    <ToggleButton value="level:all">все</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                <ToggleButtonGroup size="small">
                    <ToggleButton value="online:true">онлайн</ToggleButton>
                    <ToggleButton value="online:false">оффлайн</ToggleButton>
                    <ToggleButton value="online:all">все</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                <ToggleButtonGroup size="small">
                    <ToggleButton value="battery:low">
                        акк. {'<'} 10%
                    </ToggleButton>
                    <ToggleButton value="battery:high">
                        акк. {'>'} 90%
                    </ToggleButton>
                    <ToggleButton value="battery:all">все</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
};
