import React, {useState} from 'react';

import {useTheme, Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {useMediaQuery, Button, Grid, Paper, Typography} from '@material-ui/core';

import useReduxStore from 'hooks/useReduxStore';

import Header from 'components/Header';

import FormLogin from 'components/login/FormLogin';
import FormSignup from 'components/login/FormSignUp';
import NewsTable from 'components/login/NewsTable';

const Login: React.FC = () => {
    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));

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
            <Grid
                container
                className={classes.gridContainer}
                wrap="wrap"
                direction={matches ? 'row' : 'column'}
                spacing={3}
            >
                <Grid container item xs={12} lg={8}>
                    <Grid
                        container
                        direction="column"
                        item
                        alignItems="center"
                        justifyContent="center"
                        xs={12}
                    >
                        <Typography variant="h5" className={classes.title}>
                            STATIONS: UM WEBAPP PARA PROJETOS NAVAIS
                        </Typography>
                        <Typography align="justify" className={classes.typography}>
                            Este é um software livre desenvolvido como trabalho de conclusão de
                            curso (TCC) pelo egresso do curso de engenharia naval da Universidade
                            Federal do Pará (UFPa) Denis Antônio Nascimento Costa, cujo objetivo é
                            auxiliar os discentes, os profissionais liberais e os entusiastas do
                            ramo naval na atividade de projetar embarcações, oferecendo ferramentas
                            de modelagem e de análise, seguindo regras da Marinha do Brasil e de
                            Sociedades Classificadoras.
                        </Typography>

                        <Typography align="justify" className={classes.typography}>
                            Ademais, vale ressaltar que esta aplicação está em constante
                            desenvolvimento e todo o seu código fonte pode ser encontrado nos
                            seguintes repositórios do Github:{' '}
                            <a href="https://github.com/DenisNasc/TCC-Frontend">FRONTEND</a> /{' '}
                            <a href="https://github.com/DenisNasc/TCC-Backend">BACKEND</a>.
                        </Typography>

                        <Typography align="justify" className={classes.typography}>
                            Para contato: devdenisbr@gmail.com
                        </Typography>

                        <Typography variant="h5" className={classes.title}>
                            NOVIDADES
                        </Typography>
                        <NewsTable />
                    </Grid>
                </Grid>

                <Grid container item xs={12} lg={4}>
                    <Grid
                        container
                        item
                        direction="column"
                        alignItems="center"
                        justifyContent="flex-start"
                        xs={12}
                    >
                        {login ? <FormLogin /> : <FormSignup />}

                        {login ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={handleClick}
                            >
                                Ainda não possui uma conta? Cadastre-se!
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={handleClick}
                            >
                                Já possui uma conta? Entrar!
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            padding: theme.spacing(2),
            [theme.breakpoints.down('md')]: {
                backgroundColor: 'none',
            },
        },

        paper: {background: 'none'},
        title: {fontWeight: 'bold'},
        typography: {alignSelf: 'flex-start', marginBottom: theme.spacing(1)},
        button: {
            marginTop: theme.spacing(2),
        },
    })
);
