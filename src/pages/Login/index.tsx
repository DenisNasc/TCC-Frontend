import React, {useState, useCallback} from 'react';

import {styled} from '@mui/material/styles';
import {Button, Grid, Typography, Link} from '@mui/material';

import Header from 'components/Header';

import FormSignIn from './components/FormSignIn';
import FormSignup from './components/FormSignUp';
import NewsTable from './components/NewsTable';

const Login: React.FC = () => {
    const [account, setAccount] = useState(false);

    const handleClick = useCallback(() => setAccount(!account), []);

    return (
        <>
            <Header />
            <Grid container wrap="wrap">
                <GridItem container item xs={12} lg={8}>
                    <Grid
                        container
                        direction="column"
                        item
                        alignItems="center"
                        justifyContent="center"
                        xs={12}
                    >
                        <Title variant="h5">STATIONS - Uma WebApp para Projetos Navais</Title>
                        <Paragraf align="justify">
                            Este é um software livre desenvolvido como trabalho de conclusão de
                            curso (TCC) pelo egresso do curso de engenharia naval da Universidade
                            Federal do Pará (UFPa) Denis Antônio Nascimento Costa, cujo objetivo é
                            auxiliar os discentes, os profissionais liberais e os entusiastas do
                            ramo naval na atividade de projetar embarcações, oferecendo ferramentas
                            de modelagem e de análise, seguindo regras da Marinha do Brasil e de
                            Sociedades Classificadoras.
                        </Paragraf>

                        <Paragraf align="justify">
                            {`Ademais, vale ressaltar que esta aplicação está em constante
                            desenvolvimento e todo o seu código fonte pode ser encontrado nos
                            seguintes repositórios do Github: ${(
                                <LinkGithub href="https://github.com/DenisNasc/TCC-Frontend">
                                    FRONTEND
                                </LinkGithub>
                            )} | ${(
                                <LinkGithub href="https://github.com/DenisNasc/TCC-Backend">
                                    BACKEND
                                </LinkGithub>
                            )}.`}
                        </Paragraf>

                        <Paragraf align="justify">Para contato: devdenisbr@gmail.com.</Paragraf>

                        <TitleNews variant="h5">Novidades</TitleNews>
                        <NewsTable />
                    </Grid>
                </GridItem>

                <GridItem container item xs={12} lg={4}>
                    <Grid
                        container
                        item
                        direction="column"
                        alignItems="center"
                        justifyContent="flex-start"
                        xs={12}
                    >
                        {account ? <FormSignIn /> : <FormSignup />}

                        {account ? (
                            <ButtonSignUp
                                variant="outlined"
                                color="secondary"
                                onClick={handleClick}
                            >
                                Ainda não possui uma conta? Cadastre-se!
                            </ButtonSignUp>
                        ) : (
                            <ButtonSignIn
                                variant="outlined"
                                color="secondary"
                                onClick={handleClick}
                            >
                                Já possui uma conta? Entrar!
                            </ButtonSignIn>
                        )}
                    </Grid>
                </GridItem>
            </Grid>
        </>
    );
};

export default Login;

const GridItem = styled(Grid)(({theme}) => ({
    padding: theme.spacing(2),
}));

const Title = styled(Typography)(({theme}) => ({
    textAlign: 'left',
    fontWeight: 'bold',
    width: '100%',
    marginBottom: theme.spacing(1),
}));

const TitleNews = styled(Typography)(({theme}) => ({
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
    marginBottom: theme.spacing(1),
}));

const Paragraf = styled(Typography)(({theme}) => ({
    alignSelf: 'flex-start',
    marginBottom: theme.spacing(1),
}));

const LinkGithub = styled(Link)(({theme}) => ({}));

const ButtonSignIn = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
}));

const ButtonSignUp = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
}));
