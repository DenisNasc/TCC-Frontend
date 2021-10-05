import React, {useState, useCallback} from 'react';
import {useHistory} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, CardActions, Button, Typography} from '@material-ui/core';

interface PropsCardItem {
    title: string;
    description: string;
    projectName: string;
    pathRedirect: string;
}

const CardItem: React.FC<PropsCardItem> = ({title, description, projectName, pathRedirect}) => {
    const classes = useStyles();
    const history = useHistory();

    const redirectCallback = useCallback(
        () =>
            history.push(`/${projectName.replace(/ /g, '-').toLowerCase().trim()}/${pathRedirect}`),
        [pathRedirect, projectName]
    );

    return (
        <Card className={classes.card}>
            <CardHeader className={classes.header} title={title} />
            <CardContent className={classes.content}>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>

            <CardActions className={classes.actions}>
                <Button disabled size="small" color="primary" variant="contained">
                    Ajuda
                </Button>
                <Button size="small" color="primary" variant="contained" onClick={redirectCallback}>
                    Visualizar
                </Button>
            </CardActions>
        </Card>
    );
};

export default CardItem;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            maxWidth: '400px',
            height: '300px',
            margin: theme.spacing(3),
            padding: theme.spacing(1),
        },
        header: {height: '15%'},
        content: {
            height: '70%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'justify',
        },
        actions: {
            height: '15%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    })
);
