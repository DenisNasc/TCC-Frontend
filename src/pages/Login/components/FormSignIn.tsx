import React, {useCallback, useState} from 'react';
import {Redirect} from 'react-router-dom';

import {styled} from '@mui/material/styles';
import {Alert, Button, Divider, Paper, Typography} from '@mui/material';

import FormInput from 'components/shared/FormInput';

import useReduxStore from 'hooks/useReduxStore';

import type {TypeFetchStates} from 'types/hooks';
import type {HookParams} from 'pages/Login/components/hooks/useFormSignIn';

import useFormSignIn from './hooks/useFormSignIn';

const FormSignIn: React.FC = () => {
    const {
        user: {id},
    } = useReduxStore();

    const [formValues, setFormValues] = useState<HookParams>({email: '', password: ''});
    const [fetchStates, setFetchStates] = useState<TypeFetchStates>({
        start: false,
        success: false,
        fail: false,
    });
    const [serverMessage, setServerMessage] = useState({
        message: '',
        type: 'error',
    });

    const handleSignIn = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        setFetchStates({start: true, success: false, fail: false});
    }, []);

    useFormSignIn(fetchStates, setFetchStates, setServerMessage, formValues);

    return (
        <>
            {id && <Redirect to="/home" />}
            <Form square elevation={3}>
                <Title>ENTRAR</Title>
                <Divider />
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
                {serverMessage.message && <AlertMessage>{serverMessage.message}</AlertMessage>}
                <ButtonSignIn
                    disabled={fetchStates.start}
                    variant="contained"
                    color="secondary"
                    onClick={handleSignIn}
                >
                    Entrar
                </ButtonSignIn>
            </Form>
        </>
    );
};

export default FormSignIn;

const Form = styled(Paper)(({theme}) => ({
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
}));

const AlertMessage = styled(Alert)(({theme}) => ({
    marginTop: theme.spacing(2),
}));

const Title = styled(Typography)(({theme}) => ({
    alignSelf: 'flex-start',
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
}));

const ButtonSignIn = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
}));
