import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

import useLocalStorage from 'hooks/useLocalStorage';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Avatar, Button, Divider, IconButton, Paper, Typography} from '@material-ui/core';
import {Brightness7 as IconBrightness7, Brightness4 as IconBrightness4} from '@material-ui/icons';

import useReduxStore from 'hooks/useReduxStore';

import {APP_CHANGE_THEME} from 'state/actions/app';
import {USER_LOGOUT} from 'state/actions/user';

const Header: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [userJWT, setUserJWT] = useLocalStorage('user_token', false);

    const history = useHistory();
    const params = useParams<{userId: string}>();

    const {
        user: {id},
        app: {darkMode},
    } = useReduxStore();

    const handleTheme = () => {
        dispatch({type: APP_CHANGE_THEME, payload: {}});
    };

    const handleAvatarClick = () => {
        history.push(`/${params.userId}/profile`);
    };

    const handleLogoutClick = () => {
        setUserJWT(null);
        dispatch({type: USER_LOGOUT, payload: {}});
    };

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
                        <Button className={classes.logoutButton} onClick={handleLogoutClick}>
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
            background: '#52688F',
            color: '#E3E7F1',
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
