import React, {useCallback, useState} from 'react';
import {Redirect} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Divider, Paper, Typography} from '@material-ui/core';

import FormInput from 'components/shared/FormInput';
import DisplayMessage from 'components/shared/DisplayMessage';

import useReduxStore from 'hooks/useReduxStore';
import useLogin from 'hooks/formLogin/useFormLogin';

import type {PropsDisplayMessage} from 'components/shared/DisplayMessage';
import type {TypeFetchStates} from 'types/hooks';
import type {HookParams} from 'hooks/formLogin/useFormLogin';

const FormLogin: React.FC = () => {
    const {
        user: {id},
    } = useReduxStore();

    const [formValues, setFormValues] = useState<HookParams>({email: '', password: ''});
    const [fetchStates, setFetchStates] = useState<TypeFetchStates>({start: false, success: false, fail: false});
    const [serverMessage, setServerMessage] = useState<PropsDisplayMessage>({message: '', type: 'error'});

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
                <Typography className={classes.typography}>Login</Typography>
                <Divider className={classes.divider} />
                <FormInput id="email" label="Email" type="email" required values={formValues} setValue={setFormValues} />
                <FormInput id="password" label="Password" type="password" required values={formValues} setValue={setFormValues} />
                {serverMessage.message && <DisplayMessage message={serverMessage.message} type={serverMessage.type} />}
                <Button disabled={fetchStates.start} type="submit">
                    Submit
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
        },
        typography: {
            alignSelf: 'flex-start',
            marginBottom: theme.spacing(1),
        },
        divider: {width: '100%', height: '1px'},
    })
);
