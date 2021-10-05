import React, {useState, useCallback} from 'react';

import {useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Avatar, Button, Divider, IconButton, Paper, Typography} from '@material-ui/core';
import {Brightness7 as IconBrightness7, Brightness4 as IconBrightness4} from '@material-ui/icons';

import useReduxStore from 'hooks/useReduxStore';
import useLogout from 'hooks/header/useLogout';
import {APP_CHANGE_THEME} from 'state/actions/app';

const Header: React.FC = () => {
    const [logoutFetchStates, setLogoutFetchStates] = useState({
        start: false,
        success: false,
        fail: false,
    });

    const classes = useStyles();

    const dispatch = useDispatch();
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
        <Paper classes={{root: classes.paper}}>
            <Typography>STATIONS - Versão ALFA</Typography>

            <nav className={classes.nav}>
                <IconButton classes={{root: classes.iconButtonRoot}} onClick={handleTheme}>
                    {darkMode ? <IconBrightness4 /> : <IconBrightness7 />}
                </IconButton>
                {id && (
                    <>
                        <Divider orientation="vertical" flexItem className={classes.divider} />
                        <Avatar className={classes.avatar} onClick={handleAvatarClick} />
                        <Button classes={{root: classes.logoutButtonRoot}} onClick={handleLogout}>
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
            width: '100%',
            height: '60px',
            padding: `0px ${theme.spacing(3)}px`,
            margin: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#1E88E5',
            color: theme.palette.getContrastText('#1E88E5'),
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
            '&:hover': {
                cursor: 'pointer',
            },
        },
        iconButtonRoot: {},
        logoutButtonRoot: {
            color: '#fff',
            background: theme.palette.error.main,
            '&:hover': {
                background: theme.palette.error.dark,
            },
            fontWeight: 'bold',
            marginLeft: theme.spacing(3),
        },
    })
);
