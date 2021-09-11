import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Paper, List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import {
    Home as IconHome,
    Person as IconPerson,
    Settings as IconSettings,
    Work as IconWork,
    ExitToApp as IconExitToApp,
} from '@material-ui/icons';

const itens = [
    {title: 'Home', icon: IconHome, path: '/home/'},
    {title: 'User', icon: IconPerson, path: '/user/'},
    {title: 'Projects', icon: IconWork, path: '/projects/'},
    {title: 'Configurações', icon: IconSettings, path: '/settings/'},
];

const LateralMenu: React.FC = () => {
    const classes = useStyles();
    const {push} = useHistory();

    const pushToPage = useCallback(
        (path: string) => () => {
            push(path);
        },
        [push]
    );

    return (
        <Paper elevation={0} className={classes.paper}>
            <List className={classes.list}>
                {itens.map(e => (
                    <ListItem
                        key={e.title}
                        button
                        divider
                        onClick={pushToPage(e.path)}
                        className={classes.listItem}
                    >
                        <ListItemIcon>
                            <e.icon />
                        </ListItemIcon>
                        <ListItemText primary={e.title} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default LateralMenu;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            borderRadius: '0px',
            height: '100%',
            width: '100%',
            paddingTop: `${theme.spacing(2)}px`,
        },
        list: {
            height: '100%',
            margin: '0px',
            padding: '0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        listItem: {
            width: '100%',
            margin: '0px',

            padding: `${theme.spacing(1)}px 0px`,
        },
    })
);
