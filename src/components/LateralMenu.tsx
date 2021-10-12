import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import {Home as IconHome, Settings as IconSettings} from '@material-ui/icons';

const itens = [
    {title: 'Home', icon: IconHome, path: '/'},
    // {title: 'User', icon: IconPerson, path: '/user/'},
    // {title: 'Projects', icon: IconWork, path: '/projects/'},
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
    );
};

export default LateralMenu;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            height: 'calc(100vh - 60px)',
            width: '100%',
            margin: '0px',
            padding: '0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            borderRight: '1px solid rgb(218, 220, 224)',
        },
        listItem: {
            width: '100%',
            margin: '0px',

            padding: `${theme.spacing(1)}px 0px`,
        },
    })
);
