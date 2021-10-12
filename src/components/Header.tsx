import React, {useState, useCallback} from 'react';

import {useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Avatar, Grid, Button, Divider, IconButton, Typography} from '@material-ui/core';
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
        <Grid
            container
            component="header"
            justifyContent="space-between"
            alignItems="center"
            xs={12}
            classes={{root: classes.container}}
        >
            <Grid container item justifyContent="flex-start" xs={6}>
                <Typography classes={{root: classes.logo}}>STATIONS - Versão ALFA</Typography>
            </Grid>

            <Grid container item justifyContent="flex-end" xs={6}>
                <nav className={classes.nav}>
                    <IconButton classes={{root: classes.iconButtonRoot}} onClick={handleTheme}>
                        {darkMode ? <IconBrightness4 /> : <IconBrightness7 />}
                    </IconButton>
                    {id && (
                        <>
                            <Divider orientation="vertical" flexItem className={classes.divider} />
                            <Avatar className={classes.avatar} onClick={handleAvatarClick} />
                            <Button
                                classes={{root: classes.logoutButtonRoot}}
                                variant="contained"
                                onClick={handleLogout}
                            >
                                SAIR
                            </Button>
                        </>
                    )}
                </nav>
            </Grid>
        </Grid>
    );
};

export default Header;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '60px',
            padding: `0px ${theme.spacing(8)}px`,
            borderBottom: '1px solid rgb(218, 220, 224)',
            position: 'sticky',
        },
        logo: {fontWeight: 'bold'},
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
