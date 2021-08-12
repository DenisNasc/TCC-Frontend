import React, {useCallback, useState} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Collapse, List, ListItem, ListItemText} from '@material-ui/core';
import {ExpandMore as IconExpandMore, ExpandLess as IconExpandLess} from '@material-ui/icons';

import type {TypeStation} from 'state/reducers/currentProject/types';

interface Props {
    station: TypeStation;
}

const ListItemStation: React.FC<Props> = ({station: {name, longitudinal, coordinates}}) => {
    const [isOpen, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpenCollapse = useCallback(() => setOpen(state => !state), []);

    return (
        <>
            <ListItem button onClick={handleOpenCollapse}>
                <ListItemText primary={name} />
                <ListItemText primary={`Longitudinal: ${longitudinal}`} />
                {isOpen ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>

            <Collapse in={isOpen} timeout="auto" unmountOnExit className={classes.collapse}>
                <List component="div" disablePadding>
                    {coordinates.map(point => (
                        <ListItem key={point.id} button>
                            <ListItemText
                                primary={`Ponto ${point.order}`}
                                className={classes.listItemText}
                            />
                            <ListItemText
                                primary={`Longitudinal: ${longitudinal}`}
                                className={classes.listItemText}
                            />
                            <ListItemText
                                primary={`Transversal: ${point.transversal}`}
                                className={classes.listItemText}
                            />
                            <ListItemText
                                primary={`Vertical: ${point.vertical}`}
                                className={classes.listItemText}
                            />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default ListItemStation;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        collapse: {
            maxHeight: '400px',
            overflowY: 'scroll',
            paddingLeft: theme.spacing(3),
        },
        listItemText: {
            color: 'blue',
        },
    })
);
