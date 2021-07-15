import React from 'react';

import Helmet from 'components/Helmet';
import Header from 'components/Header';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Box, Typography, Grid} from '@material-ui/core';

import LateralMenu from 'components/LateralMenu';

interface PropsDefaultTemplate {
    title: string;
}

const DefaultTemplate: React.FC<PropsDefaultTemplate> = ({children, title}) => {
    const classes = useStyles();

    return (
        <>
            <Helmet title={title} />
            <Header />

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.gridContainer}
            >
                <Grid
                    container
                    item
                    xs={2}
                    justify="flex-start"
                    alignItems="center"
                    className={classes.grid1}
                >
                    <LateralMenu />
                </Grid>
                <Grid
                    container
                    item
                    xs={10}
                    justify="flex-start"
                    alignItems="center"
                    className={classes.grid2}
                >
                    <Box className={classes.box}>
                        <Typography variant="h4" className={classes.title}>
                            PROJETO
                        </Typography>
                        {children}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default DefaultTemplate;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            height: 'calc(100vh - 60px)',
            width: '100vw',
        },
        grid1: {
            height: '100%',
            width: '100%',
        },
        grid2: {
            padding: theme.spacing(3),
            height: '100%',
            width: '100%',
        },
        box: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        title: {marginBottom: theme.spacing(3)},
    })
);
