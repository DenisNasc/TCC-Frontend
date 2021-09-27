import React, {useState} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Grid, Paper, Typography} from '@material-ui/core';

import useReduxStore from 'hooks/useReduxStore';

import Header from 'components/Header';

import FormLogin from 'components/login/FormLogin';
import FormSignup from 'components/login/FormSignUp';

const Login: React.FC = () => {
    const classes = useStyles();

    const {
        user: {id},
    } = useReduxStore();
    const [login, setLogin] = useState(false);

    const handleClick = () => {
        setLogin(!login);
    };

    return (
        <>
            <Header />
            <Grid container className={classes.gridContainer}>
                <Grid className={classes.gridItem} item container xs={8}>
                    <Paper className={classes.paper} elevation={0}>
                        <Typography variant="h5">
                            STATIONS: UM WEBAPP PARA PROJETOS NAVAIS
                        </Typography>
                        <Typography className={classes.paragraf}>
                            Este é um software livre desenvolvido como trabalho de conclusão de
                            curso (TCC) pelo egresso do curso de engenharia naval da Universidade
                            Federal do Pará (UFPa) Denis Antônio Nascimento Costa, cujo objetivo é
                            auxiliar os discentes, os profissionais liberais e os entusiastas do
                            ramo naval na atividade de projetar embarcações, oferecendo ferramentas
                            de modelagem e de análise, seguindo regras da Marinha do Brasil e de
                            Sociedades Classificadoras.
                        </Typography>

                        <Typography variant="body1" className={classes.paragraf}>
                            Ademais, vale ressaltar que esta aplicação está em constante
                            desenvolvimento e todo o seu código fonte pode ser encontrado nos
                            seguintes repositórios do Github:{' '}
                            <a href="https://github.com/DenisNasc/TCC-Frontend">FRONTEND</a> /{' '}
                            <a href="https://github.com/DenisNasc/TCC-Backend">BACKEND</a>.
                        </Typography>

                        <Typography variant="body1" className={classes.paragraf}>
                            Para contato: devdenisbr@gmail.com
                        </Typography>

                        <Typography variant="h5" className={classes.title}>
                            NOVIDADES
                        </Typography>
                    </Paper>
                </Grid>

                <Grid className={classes.gridItem} item container xs={4}>
                    {login ? <FormLogin /> : <FormSignup />}

                    {login ? (
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={handleClick}
                        >
                            Don&apos;t have an account? Sign Up now!
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={handleClick}
                        >
                            Already has an account? Login!
                        </Button>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default Login;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            height: 'calc(100vh - 60px)',
        },
        gridItem: {
            height: '100%',
            padding: theme.spacing(3),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        paper: {width: '100%', background: 'none'},
        title: {marginTop: theme.spacing(2)},
        paragraf: {textAlign: 'justify', marginBottom: theme.spacing(1)},
        button: {
            marginTop: theme.spacing(2),
        },
    })
);
