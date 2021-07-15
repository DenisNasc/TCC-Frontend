import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Divider, Paper, Typography} from '@material-ui/core';

import {USER_LOGIN} from 'state/actions/user';

import FormInput from 'components/shared/FormInput';

const FormLogin = () => {
    const classes = useStyles();
    const [formValues, setFormValues] = useState({email: '', password: ''});

    const dispatch = useDispatch();

    const toLogin = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();

        console.log(formValues);

        // TODOS ESSES DADOS DEVEM SER COLETADOS DO BACKEND

        dispatch({
            type: USER_LOGIN,
            payload: {
                email: formValues.email,
                name: 'Denis Nascimento',
                projects: [],
                id: '777',
                token: 'token',
            },
        });
        // history.replace("/home");
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
            <Button type="submit">Submit</Button>
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
