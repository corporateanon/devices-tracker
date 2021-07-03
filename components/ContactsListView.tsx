import { Grid, makeStyles, MenuItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import 'moment/locale/ru';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useMemo, useState } from 'react';
import ReactDataGrid, {
    Column,
    RowsChangeData,
    TextEditor,
} from 'react-data-grid';
import { dateColumnFormatter } from '../lib/formatters';
import {
    Contact,
    ContactInput,
    useGetContactsQuery,
    useSaveContactMutation,
    useUpdateContactArchivedMutation,
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
    {
        key: '$actions',
        name: '',
        // eslint-disable-next-line react/display-name
        formatter: ({ row }) => <ContactMenu contact={row} />,
        width: 100,
    },
];

const ContactMenu: React.FC<{ contact: Contact }> = ({ contact }) => {
    const [anchor, setAnchor] = useState<HTMLElement>(null);
    const handleClick = useCallback((e) => {
        setAnchor(e.currentTarget);
    }, []);
    const handleClose = useCallback(() => {
        setAnchor(null);
    }, []);
    const [updateArchived] = useUpdateContactArchivedMutation();

    const handleArchive = useCallback(() => {
        handleClose();
        updateArchived({
            variables: {
                contact: {
                    _id: contact._id,
                    archived: true,
                },
            },
            refetchQueries: ['GetContacts'],
        });
    }, [contact, handleClose, updateArchived]);

    const handleUnarchive = useCallback(() => {
        handleClose();
        updateArchived({
            variables: {
                contact: {
                    _id: contact._id,
                    archived: false,
                },
            },
            refetchQueries: ['GetContacts'],
        });
    }, [contact, handleClose, updateArchived]);

    return (
        <>
            <Button variant="outlined" size="small" onClick={handleClick}>
                ...
            </Button>
            <Menu
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={handleClose}
            >
                {contact.archived ? (
                    <MenuItem onClick={handleUnarchive}>Восстановить</MenuItem>
                ) : (
                    <MenuItem onClick={handleArchive}>Архивировать</MenuItem>
                )}
            </Menu>
        </>
    );
};

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

export const ContactsListView: FC = () => {
    const classes = useStyles();
    const { query } = useRouter();
    const { data } = useGetContactsQuery({
        variables: {
            filter: queryToContactFilters(query),
        },
        fetchPolicy: 'cache-and-network',
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
                refetchQueries: ['GetContacts'],
            });
        },
        [saveContact]
    );
    const handleRowsChange = useCallback<
        (rows: Contact[], data: RowsChangeData<Contact>) => void
    >(
        (rows, { indexes: [idx] }) => {
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
};
