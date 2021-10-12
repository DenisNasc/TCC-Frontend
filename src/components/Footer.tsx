import React from 'react';

import {styled} from '@mui/material/styles';
import {Grid, Link, Typography} from '@mui/material';

const Footer: React.FC = () => {
    return (
        <GridRoot container justifyContent="flex-start" alignItems="center">
            <Grid container item xs={12}>
                <Grid
                    container
                    item
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    xs={4}
                >
                    <Title>Documentação</Title>
                    <LinkUseful href="https://github.com/DenisNasc/TCC-Frontend">
                        Frontend
                    </LinkUseful>
                    <LinkUseful href="https://github.com/DenisNasc/TCC-Backend">Backend</LinkUseful>
                </Grid>
                <Grid
                    container
                    item
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    xs={4}
                >
                    <Title>Instituições</Title>
                    <LinkUseful href="https://www.portal.ufpa.br/">
                        Universidade Federal do Pará
                    </LinkUseful>
                    <LinkUseful href="https://www.itec.ufpa.br/">
                        Instituto de Tecnologia
                    </LinkUseful>
                    <LinkUseful href="http://fenav.ufpa.br/">
                        Faculdade de Engenharia Naval
                    </LinkUseful>
                </Grid>
                <Grid
                    container
                    item
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    xs={4}
                >
                    <Title>Contato Pessoal</Title>
                    <Typography>Email: devdenis@gmail.com</Typography>
                </Grid>
            </Grid>

            <Grid container item justifyContent="center" alignItems="center" xs={12}>
                <Typography>Copyright © 2021 Denis Nascimento.</Typography>
            </Grid>
        </GridRoot>
    );
};

export default Footer;

const GridRoot = styled(Grid)(({theme}) => ({
    background: 'rgb(48, 56, 70)',
    color: theme.palette.getContrastText('rgb(48, 56, 70)'),
    padding: `0px ${theme.spacing(5)}px`,
    paddingTop: theme.spacing(2),
    height: '200px',
    width: '100vw',
}));

const Title = styled(Grid)(({theme}) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
}));

const LinkUseful = styled(Link)(({theme}) => ({}));
