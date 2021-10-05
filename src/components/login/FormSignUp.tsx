import React, {useCallback, useState} from 'react';
import {Redirect} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Divider, Paper, Typography} from '@material-ui/core';
import {Alert} from '@material-ui/lab';

import FormInput from 'components/shared/FormInput';

import useReduxStore from 'hooks/useReduxStore';
import useFormSignUp from 'components/login/hooks/useFormSignUp';

import type {PropsDisplayMessage} from 'components/shared/DisplayMessage';

const FormSignup: React.FC = () => {
    const {
        user: {id},
    } = useReduxStore();

    const [fetchStates, setFetchStates] = useState({start: false, success: false, fail: false});
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [serverMessage, setServerMessage] = useState<PropsDisplayMessage>({
        message: '',
        type: 'error',
    });

    const classes = useStyles();

    const handleSubmit = useCallback((event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        setFetchStates({start: true, success: false, fail: false});
    }, []);

    useFormSignUp(fetchStates, setFetchStates, setServerMessage, formValues, setFormValues);

    return (
        <>
            {id && <Redirect to="/home" />}
            <Paper className={classes.form} component="form" elevation={0} onSubmit={handleSubmit}>
                <Typography className={classes.typography}>CADASTRAR</Typography>
                <Divider className={classes.divider} />
                <FormInput
                    id="name"
                    label="Name"
                    type="text"
                    required
                    values={formValues}
                    setValue={setFormValues}
                />
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
                <FormInput
                    id="confirmPassword"
                    label="Confirm Password"
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
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={fetchStates.start}
                    type="submit"
                >
                    Cadastrar
                </Button>
            </Paper>
        </>
    );
};

export default FormSignup;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            borderRadius: '0px',
            width: '100%',
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3),
            color: theme.palette.getContrastText(theme.palette.background.paper),
        },
        typography: {
            alignSelf: 'flex-start',
            marginBottom: theme.spacing(1),
            fontWeight: 'bold',
        },
        displayMessage: {
            marginTop: theme.spacing(2),
        },
        divider: {width: '100%', height: '1px'},
        button: {marginTop: theme.spacing(2)},
    })
);
