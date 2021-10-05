import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

import Helmet from 'components/Helmet';
import Header from 'components/Header';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Breadcrumbs, Button, Grid} from '@material-ui/core';

import LateralMenu from 'components/LateralMenu';

interface PropsDefaultTemplate {
    title: string;
}

type TypePathname = {href: string; title: string};

const DefaultTemplate: React.FC<PropsDefaultTemplate> = ({children, title}) => {
    const [pathnameList, setPathnameList] = useState<TypePathname[]>([
        {href: '/home', title: 'Home'},
    ]);

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
            const href = `/${arr.slice(0, i + 1).reduce((initial, value) => `${initial}/${value}`)}`
                .replace(/ /g, '-')
                .toLocaleLowerCase()
                .trim();

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

            <Grid container direction="row" xs={12} justify="center" alignItems="flex-start">
                <Grid container item justifyContent="center" alignItems="center" xs={12}>
                    <Header />
                </Grid>

                <Grid container item xs={12} lg={2}>
                    <LateralMenu />
                </Grid>

                <Grid
                    container
                    item
                    xs={12}
                    lg={10}
                    justify="center"
                    alignItems="center"
                    className={classes.container}
                >
                    <Grid container item>
                        <Grid container item xs={12}>
                            <Breadcrumbs className={classes.breadcrumbs}>
                                {pathnameList.map(e => {
                                    const disabled = e.href === location.pathname;

                                    return (
                                        <Button
                                            key={e.href}
                                            component="button"
                                            disabled={disabled}
                                            onClick={handleLink(e.href)}
                                        >
                                            {e.title}
                                        </Button>
                                    );
                                })}
                            </Breadcrumbs>
                        </Grid>

                        <Grid container item xs={12}>
                            {children}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default DefaultTemplate;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {padding: theme.spacing(3)},
        breadcrumbs: {marginBottom: theme.spacing(3)},
    })
);
