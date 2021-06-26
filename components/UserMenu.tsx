import { useCallback } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { signOut, useSession } from 'next-auth/client';
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { useMobile } from '../lib/useMobile';

export const UserMenu: FC = () => {
    const isMobile = useMobile();
    const [session, loading] = useSession();
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement>(null);

    const handleClose = useCallback(() => {
        setMenuAnchor(null);
    }, []);
    const handleOpen = useCallback((event) => {
        setMenuAnchor(event.currentTarget);
    }, []);
    const handleSignOut = useCallback((event) => {
        signOut();
    }, []);

    if (loading) {
        return <>loading</>;
    }
    if (!session) {
        return <>no session</>;
    }
    const label = session.user?.name ?? session?.user?.email ?? 'Unknown user';

    const avatarURL = session.user.image ?? null;

    return (
        <>
            {isMobile ? (
                <Avatar onClick={handleOpen} src={avatarURL}></Avatar>
            ) : (
                <Chip
                    onClick={handleOpen}
                    avatar={
                        avatarURL ? <Avatar src={avatarURL}></Avatar> : null
                    }
                    label={label}
                />
            )}
            <Menu
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                onClose={handleClose}
            >
                <MenuItem disabled>{label}</MenuItem>
                <MenuItem divider />
                <MenuItem onClick={handleSignOut}>Выход</MenuItem>
            </Menu>
        </>
    );
};
