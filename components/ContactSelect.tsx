import MenuItem from '@material-ui/core/MenuItem';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { FC } from 'react';
import { useGetContactsQuery } from '../lib/generated/graphql';

export const ContactSelect: FC<TextFieldProps> = (props) => {
    const { data } = useGetContactsQuery();
    if (!data?.getContacts) {
        return null;
    }
    return (
        <TextField {...props} select>
            <MenuItem key="" value="">
                Выберите
            </MenuItem>
            {data?.getContacts?.map((contact) => (
                <MenuItem key={contact._id} value={contact._id}>
                    {contact.name}
                </MenuItem>
            ))}
        </TextField>
    );
};
