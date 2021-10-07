import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Grid, Link, Typography} from '@material-ui/core';

const Footer: React.FC = () => {
    const classes = useStyles();
    return (
        <Grid
            container
            component="footer"
            justifyContent="space-between"
            alignItems="center"
            className={classes.footer}
        >
            <Grid container item xs={12}>
                <Grid
                    container
                    item
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    xs={4}
                >
                    <Typography classes={{root: classes.title}}>Documentação</Typography>
                    <Link
                        classes={{root: classes.link}}
                        href="https://github.com/DenisNasc/TCC-Frontend"
                    >
                        Frontend
                    </Link>
                    <Link
                        classes={{root: classes.link}}
                        href="https://github.com/DenisNasc/TCC-Backend"
                    >
                        Backend
                    </Link>
                </Grid>
                <Grid
                    container
                    item
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    xs={4}
                >
                    <Typography classes={{root: classes.title}}>Instituições</Typography>
                    <Link classes={{root: classes.link}} href="https://www.portal.ufpa.br/">
                        Universidade Federal do Pará
                    </Link>
                    <Link classes={{root: classes.link}} href="https://www.itec.ufpa.br/">
                        Instituto de Tecnologia
                    </Link>
                    <Link classes={{root: classes.link}} href="http://fenav.ufpa.br/">
                        Faculdade de Engenharia Naval
                    </Link>
                </Grid>
                <Grid
                    container
                    item
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    xs={4}
                >
                    <Typography classes={{root: classes.title}}>Contato Pessoal</Typography>
                    <Typography>Email: devdenis@gmail.com</Typography>
                </Grid>
            </Grid>

            <Grid container item justifyContent="center" alignItems="center" xs={12}>
                <Typography>Copyright © 2021 Denis Nascimento.</Typography>
            </Grid>
        </Grid>
    );
};

export default Footer;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            background: 'rgb(48, 56, 70)',
            color: theme.palette.getContrastText('rgb(48, 56, 70)'),
            padding: `0px ${theme.spacing(50)}px`,
            paddingTop: theme.spacing(2),

            position: 'absolute',
            bottom: '0px',
            height: '200px',
            width: '100vw',
        },
        title: {
            fontWeight: 'bold',
            marginBottom: theme.spacing(1),
        },
        link: {color: theme.palette.getContrastText('rgb(48, 56, 70)')},
    })
);
