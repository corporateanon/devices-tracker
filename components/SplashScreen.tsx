import { Button, Grid, makeStyles, Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { signIn, useSession } from 'next-auth/client';
import { FC } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    innerContainer: {
        height: '100%',
    },
    paper: {
        width: theme.spacing(50),
        height: theme.spacing(50),

        margin: 'auto',
    },
}));

export const SplashScreen: FC = ({ children }) => {
    const classes = useStyles();
    const [session, loading] = useSession();

    let content = (
        <Button onClick={() => signIn('google')}>Вход в систему</Button>
    );
    if (loading) {
        content = <Typography variant="body1">Загрузка</Typography>;
    }
    if (session) {
        return <>{children}</>;
    }

    return (
        <Grid container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                    className={classes.innerContainer}
                >
                    <Grid item>{content}</Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};
