import React, {useState, useCallback} from 'react';

import {
    Grid,
    Box,
    Divider,
    IconButton,
    Typography,
    TextField,
    NativeSelect,
} from '@material-ui/core';
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
type TypeCoordinate = {
    type: string;
    transversal: number;
    vertical: number;
};

const AddStationCoordinate: React.FC<Props> = ({userID, projectID, stationID, longitudinal}) => {
    const [fetchState, setFetchState] = useState<TypeFetchStates>({
        start: false,
        success: false,
        fail: false,
    });
    const [state, setState] = useState<TypeCoordinate>({
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

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setState(prevState => ({...prevState, type: event.target.value}));
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
        <Grid container xs={12} classes={{root: classes.container}}>
            <Grid
                container
                item
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                xs={2}
            >
                <Typography className={classes.type}>TIPO</Typography>
                <NativeSelect value={state.type} onChange={handleSelect}>
                    <option aria-label="None" value="-" />
                    <option value="start">Iníco</option>
                    <option value="deck">Convés</option>
                    <option value="end">Final</option>
                </NativeSelect>
            </Grid>

            <Grid container item justifyContent="space-around" alignItems="center" xs={8}>
                <Box className={classes.box}>
                    <Typography className={classes.type}>LONGITUDINAL</Typography>
                    <Typography>{longitudinal}</Typography>
                </Box>

                <Box className={classes.box}>
                    <Typography className={classes.type}>TRANSVERSAL</Typography>
                    <TextField
                        className={classes.textField}
                        onChange={handleStates('transversal')}
                        type="number"
                        value={state.transversal}
                    />
                </Box>

                <Box className={classes.box}>
                    <Typography className={classes.type}>VERTICAL</Typography>
                    <TextField
                        className={classes.textField}
                        onChange={handleStates('vertical')}
                        type="number"
                        value={state.vertical}
                    />
                </Box>
            </Grid>

            <Grid container item xs={2}>
                <IconButton onClick={handleCreateCoordinate}>
                    <IconAdd />
                </IconButton>
                <IconButton onClick={handleClearState}>
                    <IconClear />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default AddStationCoordinate;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            background: '#E0E0E0',
            padding: `${theme.spacing(1)}px 0px`,
        },
        box: {
            minHeight: '48px',
            padding: `0px ${theme.spacing(2)}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        textField: {maxWidth: '50px'},

        type: {
            fontWeight: 'bold',
            color: theme.palette.getContrastText('#9E9E9E'),
        },
    })
);
