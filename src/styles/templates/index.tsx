import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

import Helmet from 'components/Helmet';
import Header from 'components/Header';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Box, Breadcrumbs, Grid} from '@material-ui/core';

import LateralMenu from 'components/LateralMenu';

interface PropsDefaultTemplate {
    title: string;
}

type TypePathname = {href: string; title: string};

const DefaultTemplate: React.FC<PropsDefaultTemplate> = ({children, title}) => {
    const [pathnameList, setPathnameList] = useState<TypePathname[]>([{href: '/home', title: 'Home'}]);

    const location = useLocation();
    const history = useHistory();

    const classes = useStyles();

    useEffect(() => {
        if (location.pathname === '/home') {
            setPathnameList([{href: '/home', title: 'Home'}]);
            return;
        }

        const pathnameArray = location.pathname.split('/');
        pathnameArray.shift();

        const formatedPathnameArray = pathnameArray.map((e, i, arr) => {
            const href = `/${arr.slice(0, i + 1).reduce((initial, value) => `${initial}/${value}`)}`.replace(/ /g, '-').toLocaleLowerCase().trim();

            return {
                title: `${e.charAt(0).toUpperCase() + e.slice(1)}`.replace(/-/g, ' ').trim(),
                href,
            };
        });

        formatedPathnameArray.unshift({title: 'Home', href: '/home'});

        setPathnameList(formatedPathnameArray);
    }, [location]);

    const handleLink = (href: string) => () => {
        history.push(href);
    };

    return (
        <>
            <Helmet title={title} />
            <Header />

            <Grid container direction="row" justify="center" alignItems="center" className={classes.gridContainer}>
                <Grid container item xs={2} justify="flex-start" alignItems="center" className={classes.grid1}>
                    <LateralMenu />
                </Grid>
                <Grid container item xs={10} justify="flex-start" alignItems="center" className={classes.grid2}>
                    <Box className={classes.box}>
                        <Breadcrumbs className={classes.breadcrumbs}>
                            {pathnameList.map(e => {
                                const disabled = e.href === location.pathname;

                                return (
                                    <Button key={e.href} component="button" disabled={disabled} onClick={handleLink(e.href)}>
                                        {e.title}
                                    </Button>
                                );
                            })}
                        </Breadcrumbs>
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
        breadcrumbs: {marginBottom: theme.spacing(3)},
    })
);
