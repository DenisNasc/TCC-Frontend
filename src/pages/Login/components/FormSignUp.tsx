import React, {useCallback, useState} from 'react';
import {Redirect} from 'react-router-dom';

import {styled} from '@mui/material/styles';
import {Alert, Button, Divider, Paper, Typography} from '@mui/material';

import FormInput from 'components/shared/FormInput';

import useReduxStore from 'hooks/useReduxStore';
import useFormSignUp from 'pages/Login/components/hooks/useFormSignUp';

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
    const [serverMessage, setServerMessage] = useState({
        message: '',
        type: 'error',
    });

    const handleSingUp = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setFetchStates({start: true, success: false, fail: false});
    }, []);

    useFormSignUp(fetchStates, setFetchStates, setServerMessage, formValues, setFormValues);

    return (
        <>
            {id && <Redirect to="/home" />}
            <Form square elevation={3}>
                <Title>CADASTRAR</Title>
                <Divider />
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
                    <AlertMessage variant="standard">{serverMessage.message}</AlertMessage>
                )}
                <ButtonSignUp
                    variant="contained"
                    color="secondary"
                    disabled={fetchStates.start}
                    onClick={handleSingUp}
                >
                    Cadastrar
                </ButtonSignUp>
            </Form>
        </>
    );
};

export default FormSignup;

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

const ButtonSignUp = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
}));
