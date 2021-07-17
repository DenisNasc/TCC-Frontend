import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Divider, Paper, Typography} from '@material-ui/core';

import {axiosDevInstance} from 'axiosInstances';

import useLocalStorage from 'hooks/useLocalStorage';

import FormInput from 'components/shared/FormInput';
import DisplayMessage, {PropsDisplayMessage} from 'components/shared/DisplayMessage';

const FormLogin: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    const [_, setLocalStorageUserJWT] = useLocalStorage('user_token', false);

    const [formValues, setFormValues] = useState({email: '', password: ''});
    const [fetchStates, setFetchStates] = useState({start: false, success: false, fail: false});
    const [serverMessage, setServerMessage] = useState<PropsDisplayMessage>({
        message: '',
        type: 'error',
    });

    const {email, password} = formValues;
    const {start} = fetchStates;

    const axiosDev = axiosDevInstance('');

    useEffect(() => {
        if (!start) return;

        const verifyUserAuth = async () => {
            try {
                const {data: dataToken} = await axiosDev.post('/auth', {
                    email,
                    password,
                });

                const {access_token: accessToken} = dataToken;

                setLocalStorageUserJWT(accessToken);
                setFetchStates({start: false, success: true, fail: false});
                setServerMessage({
                    type: 'success',
                    message: 'Login feito com sucesso!',
                });

                history.push('/home');
            } catch (error) {
                if (!error || !error.response) {
                    setServerMessage({
                        type: 'error',
                        message: 'Servidor não responde',
                    });
                    setFetchStates({start: false, success: false, fail: true});
                    return;
                }

                const {status} = error.response;

                let message = '';
                switch (status) {
                    case 401: {
                        message = 'As credenciais não estão cadastradas';
                        break;
                    }
                    default: {
                        message = 'Erro no servidor';
                    }
                }

                setServerMessage({
                    type: 'error',
                    message,
                });
                setFetchStates({start: false, success: false, fail: true});
            }
        };
        verifyUserAuth();
    }, [start]);

    const toLogin = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();

        setFetchStates({start: true, success: false, fail: false});
    };

    return (
        <Paper className={classes.form} component="form" elevation={0} onSubmit={toLogin}>
            <Typography className={classes.typography}>Login</Typography>
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
                <DisplayMessage message={serverMessage.message} type={serverMessage.type} />
            )}
            <Button disabled={start} type="submit">
                Submit
            </Button>
        </Paper>
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
