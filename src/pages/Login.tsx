import React, {useState} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Grid, Paper, Typography} from '@material-ui/core';

import Header from 'components/Header';

import FormLogin from 'components/login/FormLogin';
import FormSignup from 'components/login/FormSignup';

const Login: React.FC = () => {
    const classes = useStyles();

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
                            Gerenciador de Projetos *COLOCAR UM NOME DAORA*
                        </Typography>
                        <Typography className={classes.paragraf}>
                            Este é um software desenvolvido com o objetivo de proporcionar uma forma
                            de gerenciar e de aumentar a eficiência entre as partes envolvidas em
                            projetos de engenharia naval. Afim de alcançar esta meta, pensou-se em
                            concentrar todos os arquivos e todas as informações relevante no que
                            tange o desenvolvimento de embarcações, tais como vesões do arranjo
                            geral e do plano de linhas, além de dados sobre o estaleiro construtor e
                            o armador.
                        </Typography>

                        <Typography variant="body1" className={classes.paragraf}>
                            Ademais, este empreendimento faz parte do trabalho de conclusão de curso
                            (TCC) do discente Denis Nascimento da Faculdade de Engenharia Naval da
                            Universidade Federal do Pará (FENAV).
                        </Typography>

                        <Typography variant="h5">Agradecimentos</Typography>
                        <Typography variant="body1" className={classes.paragraf}>
                            Como egresso do curso de graduação em engenharia naval da Universidade
                            Federal do Pará, gostaria de expressar meus profundos agradecimentos aos
                            professores que fizeram valer a sua posição e compartilharam o seu
                            conhecimento adquirido forma exemplar e sem fomentar questões
                            desconfortáveis, principalmente de cunho psicológico nos discentes.
                            Também, gostaria de expressar minha profunda gratidão aos meus pais os
                            quais me apoiaram e proporcionaram o ambiente necessário para que eu
                            pudesse lidar com as conjunturas da melhor maneira possível. Por fim,
                            deixo um grande obrigado aos meus amigos os quais, ao longo desses anos,
                            me ajudaram demasiadamente a seguir em frente. Agradeço a todos vocês!
                        </Typography>
                    </Paper>
                </Grid>

                <Grid className={classes.gridItem} item container xs={4}>
                    {login ? <FormLogin /> : <FormSignup />}
                    {login ? (
                        <Button className={classes.button} onClick={handleClick}>
                            Don&apos;t have an account? Sign Up now!
                        </Button>
                    ) : (
                        <Button className={classes.button} onClick={handleClick}>
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
        paragraf: {},
        button: {},
    })
);
