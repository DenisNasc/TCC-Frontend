import React, {useState, useCallback, useContext} from 'react';

import {useHistory, useParams} from 'react-router-dom';

import {styled, useTheme} from '@mui/material/styles';
import {Avatar, Grid, Stack, Button, Divider, IconButton, Typography} from '@mui/material';
import {Brightness7 as IconBrightness7, Brightness4 as IconBrightness4} from '@mui/icons-material';

import useReduxStore from 'hooks/useReduxStore';
import useLogout from 'hooks/header/useLogout';

import {ColorModeContext} from 'styles';

const Header: React.FC = () => {
    const history = useHistory();
    const params = useParams<{userId: string}>();
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    const {
        user: {id: userID},
    } = useReduxStore();

    const [logoutFetchStates, setLogoutFetchStates] = useState({
        start: false,
        success: false,
        fail: false,
    });

    useLogout(logoutFetchStates, setLogoutFetchStates);

    const handleAvatarClick = () => {
        history.push(`/${params.userId}/profile`);
    };

    const handleLogout = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setLogoutFetchStates({start: true, success: false, fail: false});
    }, []);

    return (
        <GridRoot container justifyContent="space-between" alignItems="center" xs={12}>
            <Grid container item justifyContent="flex-start" xs={6}>
                <Logo>STATIONS - Versão ALFA</Logo>
            </Grid>

            <Grid container item justifyContent="flex-end" xs={6}>
                <Stack direction="row" alignItems="center">
                    <ButtonTheme onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <IconBrightness4 /> : <IconBrightness7 />}
                    </ButtonTheme>

                    {userID && (
                        <>
                            <Divider orientation="vertical" flexItem />
                            <ButtonUser onClick={handleAvatarClick} />
                            <ButtonLogout variant="contained" onClick={handleLogout}>
                                SAIR
                            </ButtonLogout>
                        </>
                    )}
                </Stack>
            </Grid>
        </GridRoot>
    );
};

export default Header;

const GridRoot = styled(Grid)(({theme}) => ({
    height: '60px',
    padding: `0px ${theme.spacing(8)}`,
    borderBottom: '1px solid rgb(218, 220, 224)',
    position: 'sticky',
}));

const Logo = styled(Typography)(({theme}) => ({
    fontWeight: 'bold',
}));

const ButtonTheme = styled(IconButton)(({theme}) => ({
    fontWeight: 'bold',
}));

const ButtonLogout = styled(Button)(({theme}) => ({}));
const ButtonUser = styled(Avatar)(({theme}) => ({}));
