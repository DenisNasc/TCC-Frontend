import React, {useCallback, useState} from 'react';
import useReduxStore from 'hooks/useReduxStore';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Collapse, Typography, List, ListItem, IconButton, Box} from '@material-ui/core';
import {
    ExpandMore as IconExpandMore,
    ExpandLess as IconExpandLess,
    Edit as IconEdit,
    Delete as IconDelete,
} from '@material-ui/icons';

// import useUpdateStation from './hooks/useUpdateStation'

import StationCoordinate from 'components/tabelaCotas/StationCoordinate';
import AddStationCoordinate from 'components/tabelaCotas/AddStationCoordinate';

import type {TypeStation} from 'state/reducers/currentProject/types';
import type {TypeFetchStates} from 'types/hooks';

import useGetStationsCoordinates from 'components/project/hooks/useGetStationsCoordinates';
import useDeleteStation from './hooks/useDeleteStation';

interface Props {
    station: TypeStation;
}

const ListItemStation: React.FC<Props> = ({station: {name, longitudinal, coordinates, id}}) => {
    const [isOpen, setOpen] = useState(false);
    const {
        currentProject: {id: projectID},
        user: {id: userID},
    } = useReduxStore();

    const [deleteFetchStates, setDeleteFetchStates] = useState<TypeFetchStates>({
        start: false,
        success: false,
        fail: false,
    });

    const classes = useStyles();

    const handleOpenCollapse = useCallback(() => setOpen(state => !state), []);

    const handleDeleteStation = useCallback(
        () =>
            setDeleteFetchStates({
                start: true,
                success: false,
                fail: false,
            }),
        []
    );

    const handleEditStation = useCallback(() => {}, []);

    useGetStationsCoordinates({userID, projectID, optional: deleteFetchStates.success});
    useDeleteStation({userID, projectID, stationID: id}, deleteFetchStates, setDeleteFetchStates);
    // useAddCoordinate()

    return (
        <>
            <ListItem className={classes.station}>
                <Box className={classes.boxActions}>
                    <IconButton onClick={handleDeleteStation}>
                        <IconDelete />
                    </IconButton>
                    <IconButton onClick={handleEditStation}>
                        <IconEdit />
                    </IconButton>
                </Box>
                <Typography className={classes.name}>{name.toUpperCase()}</Typography>
                {isOpen ? (
                    <IconButton onClick={handleOpenCollapse}>
                        <IconExpandLess />
                    </IconButton>
                ) : (
                    <IconButton onClick={handleOpenCollapse}>
                        <IconExpandMore />
                    </IconButton>
                )}
            </ListItem>

            <Collapse in={isOpen} timeout="auto" unmountOnExit className={classes.collapse}>
                <List component="div" disablePadding>
                    {coordinates
                        .map(({id: coordID, order, vertical, transversal}) => (
                            <ListItem key={coordID} divider className={classes.listItem}>
                                <StationCoordinate
                                    userID={userID}
                                    projectID={projectID}
                                    stationID={id}
                                    coordinateID={coordID}
                                    order={order}
                                    longitudinal={longitudinal}
                                    transversal={transversal}
                                    vertical={vertical}
                                />
                            </ListItem>
                        ))
                        .concat(
                            <AddStationCoordinate
                                longitudinal={longitudinal}
                                userID={userID}
                                projectID={projectID}
                                stationID={id}
                            />
                        )}
                </List>
            </Collapse>
        </>
    );
};

export default ListItemStation;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        station: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        name: {fontWeight: 'bold'},
        longitudinal: {fontWeight: 'bold'},
        collapse: {
            maxHeight: '284px',
            overflowY: 'auto',
        },
        listItem: {
            maxHeight: '72px',
            display: 'flex',
            justifyContent: 'space-between',
            background: '#607D8B',
        },
        listItemBox: {
            maxHeight: '72px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        boxActions: {},
        typography: {
            fontSize: '14px',
            color: theme.palette.getContrastText('#607D8B'),
        },
    })
);
