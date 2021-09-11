import React, {useState, useCallback} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Divider, Typography, IconButton, Box} from '@material-ui/core';
import {Edit as IconEdit, Delete as IconDelete} from '@material-ui/icons';

import useDeleteCoordinate from './hooks/useDeleteCoordinate';

interface Props {
    userID: string;
    projectID: string;
    stationID: string;
    coordinateID: string;

    order: string | number | undefined;
    longitudinal: string | number;
    transversal: string | number;
    vertical: string | number;
}

const StationCoordinate: React.FC<Props> = ({
    userID,
    projectID,
    stationID,
    coordinateID,
    order,
    longitudinal,
    transversal,
    vertical,
}) => {
    const classes = useStyles();
    const [deleteFetch, setDeleteFetch] = useState({start: false, success: false, fail: false});

    const handleDeleteCoordinate = useCallback(
        () => setDeleteFetch({start: true, success: false, fail: false}),
        []
    );

    useDeleteCoordinate({userID, projectID, stationID, coordinateID}, deleteFetch, setDeleteFetch);

    return (
        <>
            <Box className={classes.listItemBox}>
                <Typography className={classes.typography}>Tipo</Typography>
                <Typography className={classes.typography}>{order || '1'}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />

            <Box className={classes.listItemBox}>
                <Typography className={classes.typography}>Longitudinal</Typography>
                <Typography className={classes.typography}>{longitudinal}</Typography>
            </Box>

            <Box className={classes.listItemBox}>
                <Typography className={classes.typography}>Transversal</Typography>
                <Typography className={classes.typography}>{transversal}</Typography>
            </Box>

            <Box className={classes.listItemBox}>
                <Typography className={classes.typography}>Vertical</Typography>
                <Typography className={classes.typography}>{vertical}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />

            <Box className={classes.boxActions}>
                <IconButton onClick={() => {}}>
                    <IconEdit />
                </IconButton>
                <IconButton onClick={handleDeleteCoordinate}>
                    <IconDelete />
                </IconButton>
            </Box>
        </>
    );
};

export default StationCoordinate;

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
