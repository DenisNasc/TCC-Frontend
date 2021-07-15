import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Divider, Paper, Typography} from '@material-ui/core';

import {axiosDevInstance} from 'axiosInstances';

import FormInput from 'components/shared/FormInput';
import DisplayMessage, {PropsDisplayMessage} from 'components/shared/DisplayMessage';

import useLocalStorage from 'hooks/useLocalStorage';

const FormSignup: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const [_, setLocalStorageUserJWT] = useLocalStorage('user_token', false);

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

    const {start} = fetchStates;
    const {password, confirmPassword, name, email} = formValues;

    useEffect(() => {
        if (!start) return;
        if (password !== confirmPassword) {
            setServerMessage({
                type: 'warning',
                message: 'A confirmação de senha falhou',
            });
            setFetchStates({start: false, success: false, fail: false});
            return;
        }

        const createNewUser = async () => {
            try {
                await axiosDevInstance({}).post('/users', {
                    name,
                    email,
                    password,
                });

                setServerMessage({
                    type: 'success',
                    message: 'Usuário criado com sucesso',
                });

                const {data} = await axiosDevInstance({}).post('/auth', {
                    email,
                    password,
                });

                const {access_token: accessToken} = data;
                setLocalStorageUserJWT(accessToken);

                setFetchStates({start: false, success: true, fail: false});
                setFormValues({name: '', email: '', password: '', confirmPassword: ''});
                history.push('/home');
            } catch (error) {
                setFetchStates({start: false, success: false, fail: true});
                setServerMessage({
                    type: 'error',
                    message: 'Não foi possível cadastrar o usuário',
                });
            }
        };

        createNewUser();
    }, [start]);

    const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        setFetchStates({start: true, success: false, fail: false});
    };

    return (
        <Paper className={classes.form} component="form" elevation={0} onSubmit={handleSubmit}>
            <Typography className={classes.typography}>Sign Up</Typography>
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
                <DisplayMessage message={serverMessage.message} type={serverMessage.type} />
            )}
            <Button disabled={start} type="submit">
                Submit
            </Button>
        </Paper>
    );
};

export default FormSignup;

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
