import React, {useState, useCallback} from 'react';

import {useHistory, useParams} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Avatar, Button, Divider, IconButton, Paper, Typography} from '@material-ui/core';
import {Brightness7 as IconBrightness7, Brightness4 as IconBrightness4} from '@material-ui/icons';

import useReduxStore from 'hooks/useReduxStore';
import useLogout from 'hooks/header/useLogout';

const Header: React.FC = () => {
    const [logoutFetchStates, setLogoutFetchStates] = useState({
        start: false,
        success: false,
        fail: false,
    });

    const classes = useStyles();

    const history = useHistory();
    const params = useParams<{userId: string}>();

    const {
        user: {id},
        app: {darkMode},
    } = useReduxStore();

    useLogout(logoutFetchStates, setLogoutFetchStates);

    const handleTheme = () => {
        // dispatch({type: APP_CHANGE_THEME, payload: {}});
    };

    const handleAvatarClick = () => {
        history.push(`/${params.userId}/profile`);
    };

    const handleLogout = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setLogoutFetchStates({start: true, success: false, fail: false});
    }, []);

    return (
        <Paper className={classes.paper}>
            <Typography>千鶴 PROJECT</Typography>
            <nav className={classes.nav}>
                <IconButton onClick={handleTheme}>
                    {darkMode ? <IconBrightness4 /> : <IconBrightness7 />}
                </IconButton>
                {id && (
                    <>
                        <Divider orientation="vertical" flexItem className={classes.divider} />
                        <Avatar className={classes.avatar} onClick={handleAvatarClick} />
                        <Button className={classes.logoutButton} onClick={handleLogout}>
                            LOGOUT
                        </Button>
                    </>
                )}
            </nav>
        </Paper>
    );
};

export default Header;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: '100vw',
            height: '60px',
            margin: '0px',
            padding: '0px 24px',
            border: 'none',
            borderRadius: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: theme.palette.getContrastText(theme.palette.background.paper),
        },
        nav: {
            display: 'flex',
            alignItems: 'center',
            margin: '0px',
            padding: '0px',
        },
        divider: {
            marginLeft: theme.spacing(3),
        },
        avatar: {
            marginLeft: theme.spacing(3),
        },
        logoutButton: {
            color: theme.palette.getContrastText(theme.palette.error.main),
            backgroundColor: theme.palette.error.main,
            marginLeft: theme.spacing(3),
        },
    })
);
