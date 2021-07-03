import { Grid, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { pick } from 'lodash';
import 'moment/locale/ru';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import ReactDataGrid, {
    Column,
    RowsChangeData,
    TextEditor,
} from 'react-data-grid';
import { dateColumnFormatter } from '../lib/formatters';
import {
    Contact,
    ContactInput,
    GetContactsDocument,
    useGetContactsQuery,
    useSaveContactMutation,
} from '../lib/generated/graphql';
import { ContactToolbar } from './ContactToolbar';
import { queryToContactFilters } from './filters/contactFilters';

const columns: readonly Column<Contact>[] = [
    {
        key: 'name',
        name: 'Имя',
        editable: true,
        editor: TextEditor,
    },
    {
        key: 'phone',
        name: 'Телефон',
        editor: TextEditor,
    },
    {
        key: 'updatedAt',
        name: 'Последнее изменение',
        formatter: dateColumnFormatter,
    },
];

const useStyles = makeStyles({
    root: {
        height: '100%',
    },
    gridWrapper: {
        flex: 1,
    },
    grid: {
        height: '100%',
    },
});

export function ContactsListView() {
    const classes = useStyles();
    const { query } = useRouter();
    const { error, data, loading } = useGetContactsQuery({
        variables: {
            filter: queryToContactFilters(query),
        },
        ssr: false,
    });

    const rows = useMemo(() => {
        return data?.getContacts ?? [];
    }, [data]);

    const [saveContact] = useSaveContactMutation();
    const saveContactAndUpdateList = useCallback(
        (contactInput: ContactInput) => {
            return saveContact({
                variables: {
                    contact: contactInput,
                },
                refetchQueries: [{ query: GetContactsDocument }],
            });
        },
        [saveContact]
    );
    const handleRowsChange = useCallback<
        (rows: Contact[], data: RowsChangeData<Contact>) => void
    >(
        (rows, { column, indexes: [idx] }) => {
            const contact = rows[idx];
            const contactInput: ContactInput = {
                _id: contact._id,
                name: contact.name,
                phone: contact.phone,
            };
            saveContactAndUpdateList(contactInput);
        },
        [saveContactAndUpdateList]
    );
    const handleAdd = useCallback(() => {
        saveContactAndUpdateList({
            _id: null,
            name: 'Новый контакт',
            phone: '',
        });
    }, [saveContactAndUpdateList]);

    return (
        <Grid container direction="column" className={classes.root}>
            <Grid item>
                <ContactToolbar />
            </Grid>
            <Grid item className={classes.gridWrapper}>
                <ReactDataGrid
                    onRowsChange={handleRowsChange}
                    columns={columns}
                    rows={rows}
                    className={classes.grid}
                />
            </Grid>
            <Grid item>
                <Box margin={1} display="flex">
                    <Box flex={1}></Box>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAdd}
                    >
                        Создать
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}
