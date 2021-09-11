import React, {useState, useCallback} from 'react';

import {Box, Divider, IconButton, Typography, TextField} from '@material-ui/core';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Add as IconAdd, Clear as IconClear} from '@material-ui/icons';

import type {TypeFetchStates} from 'types/hooks';

import useCreateCoordinate from './hooks/useCreateCoordinate';

interface Props {
    userID: string;
    projectID: string;
    stationID: string;
    longitudinal: number;
}

const AddStationCoordinate: React.FC<Props> = ({userID, projectID, stationID, longitudinal}) => {
    const [fetchState, setFetchState] = useState<TypeFetchStates>({
        start: false,
        success: false,
        fail: false,
    });
    const [state, setState] = useState<{type: string; transversal: number; vertical: number}>({
        type: '',
        transversal: 0,
        vertical: 0,
    });

    const handleClearState = useCallback(
        () =>
            setState({
                type: '',
                transversal: 0,
                vertical: 0,
            }),
        []
    );
    const classes = useStyles();

    const handleStates = (key: string) => (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        event.preventDefault();
        setState(prevState => ({...prevState, [key]: event.target.value}));
    };

    const handleCreateCoordinate = useCallback(
        () => setFetchState({start: true, success: false, fail: false}),
        []
    );

    useCreateCoordinate(
        {userID, projectID, stationID, params: {...state}},
        fetchState,
        setFetchState,
        setState
    );

    return (
        <Box className={classes.container}>
            <Box className={classes.box}>
                <Typography className={classes.typography}>Tipo</Typography>
                <TextField
                    className={classes.textField}
                    onChange={handleStates('type')}
                    value={state.type}
                />
            </Box>
            <Divider orientation="vertical" flexItem />

            <Box className={classes.box}>
                <Typography className={classes.typography}>Longitudinal</Typography>
                <Typography>{longitudinal}</Typography>
            </Box>

            <Box className={classes.box}>
                <Typography className={classes.typography}>Transversal</Typography>
                <TextField
                    className={classes.textField}
                    onChange={handleStates('transversal')}
                    type="number"
                    value={state.transversal}
                />
            </Box>

            <Box className={classes.box}>
                <Typography className={classes.typography}>Vertical</Typography>
                <TextField
                    className={classes.textField}
                    onChange={handleStates('vertical')}
                    type="number"
                    value={state.vertical}
                />
            </Box>
            <Divider orientation="vertical" flexItem />

            <Box className={classes.actions}>
                <IconButton onClick={handleCreateCoordinate}>
                    <IconAdd />
                </IconButton>
                <IconButton onClick={handleClearState}>
                    <IconClear />
                </IconButton>
            </Box>
        </Box>
    );
};

export default AddStationCoordinate;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            alignItems: 'center',
            background: 'red',
            padding: '6px 0px',
            justifyContent: 'space-between',
        },
        box: {
            minHeight: '60px',
            maxHeight: '72px',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        textField: {maxWidth: '50px'},
        actions: {display: 'flex'},
        typography: {
            fontSize: '14px',
            color: theme.palette.getContrastText('#607D8B'),
        },
    })
);
