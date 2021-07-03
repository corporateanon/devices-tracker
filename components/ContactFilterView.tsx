import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import React, { ChangeEvent } from 'react';
import { ContactFilter } from '../lib/generated/graphql';

export const ContactFilterView: React.FC<{
    value: ContactFilter;
    onChange: (v: ContactFilter) => void;
}> = ({ value, onChange }) => {
    const handleChange = (field: string, isCheckbox: boolean) => (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const v = isCheckbox ? event.target.checked : event.target.value;
        const newValue = { ...value, [field]: v === 'not_selected' ? null : v };
        onChange(newValue);
    };

    return (
        <Grid container spacing={1}>
            <Grid item>
                <FormControlLabel
                    label="Показать архив"
                    control={
                        <Switch
                            checked={value.archived}
                            onChange={handleChange('archived', true)}
                        />
                    }
                />
            </Grid>
        </Grid>
    );
};
