import { Avatar, Chip, MenuItem, Menu } from '@material-ui/core';
import { useCallback } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { signOut, useSession } from 'next-auth/client';

export const UserMenu: FC = () => {
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
            <div onClick={handleOpen}>
                <Chip
                    avatar={
                        avatarURL ? <Avatar src={avatarURL}></Avatar> : null
                    }
                    label={label}
                />
            </div>
            <Menu
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                onClose={handleClose}
            >
                <MenuItem onClick={handleSignOut}>Выход</MenuItem>
            </Menu>
        </>
    );
};
