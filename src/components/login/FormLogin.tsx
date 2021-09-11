import React, {useCallback, useState} from 'react';
import {Redirect} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Divider, Paper, Typography} from '@material-ui/core';
import {Alert} from '@material-ui/lab';

import FormInput from 'components/shared/FormInput';

import useReduxStore from 'hooks/useReduxStore';
import type {PropsDisplayMessage} from 'components/shared/DisplayMessage';
import type {TypeFetchStates} from 'types/hooks';
import type {HookParams} from 'components/login/hooks/useFormLogin';

import useLogin from './hooks/useFormLogin';

const FormLogin: React.FC = () => {
    const {
        user: {id},
    } = useReduxStore();

    const [formValues, setFormValues] = useState<HookParams>({email: '', password: ''});
    const [fetchStates, setFetchStates] = useState<TypeFetchStates>({
        start: false,
        success: false,
        fail: false,
    });
    const [serverMessage, setServerMessage] = useState<PropsDisplayMessage>({
        message: '',
        type: 'error',
    });

    const classes = useStyles();

    const handleLogin = useCallback((event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();

        setFetchStates({start: true, success: false, fail: false});
    }, []);

    useLogin(fetchStates, setFetchStates, setServerMessage, formValues);

    return (
        <>
            {id && <Redirect to="/home" />}
            <Paper className={classes.form} component="form" elevation={0} onSubmit={handleLogin}>
                <Typography className={classes.typography}>SIGN IN</Typography>
                <Divider className={classes.divider} />
                <FormInput
                    id="email"
                    label="Email"
                    type="email"
                    required
                    values={formValues}
                    setValue={setFormValues}
                />
                <FormInput
                    id="password"
                    label="Password"
                    type="password"
                    required
                    values={formValues}
                    setValue={setFormValues}
                />
                {serverMessage.message && (
                    <Alert
                        severity={serverMessage.type}
                        variant="standard"
                        className={classes.displayMessage}
                    >
                        {serverMessage.message}
                    </Alert>
                )}
                <Button
                    disabled={fetchStates.start}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Entrar
                </Button>
            </Paper>
        </>
    );
};

export default FormLogin;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            borderRadius: '0px',
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3),
            color: theme.palette.getContrastText(theme.palette.background.paper),
        },
        displayMessage: {
            marginTop: theme.spacing(2),
        },
        typography: {
            alignSelf: 'flex-start',
            marginBottom: theme.spacing(1),
            fontWeight: 'bold',
        },
        divider: {width: '100%', height: '1px'},
        button: {marginTop: theme.spacing(2)},
    })
);
