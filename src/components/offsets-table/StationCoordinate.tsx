import React, {useState, useCallback} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Divider, Modal, Paper, Typography, IconButton, Box, Grid} from '@material-ui/core';
import {Edit as IconEdit, Delete as IconDelete} from '@material-ui/icons';

import FormInput from 'components/shared/FormInput';

import useDeleteCoordinate from './hooks/useDeleteCoordinate';
import useEditCoordinate from './hooks/useEditCoordinate';

interface Props {
    userID: string;
    projectID: string;
    stationID: string;
    coordinateID: string;
    stationName: string;
    type?: string;
    order?: number;
    longitudinal: string | number;
    transversal: string | number;
    vertical: string | number;
}

const StationCoordinate: React.FC<Props> = ({
    userID,
    projectID,
    stationID,
    coordinateID,
    stationName,
    type,
    order,
    longitudinal,
    transversal,
    vertical,
}) => {
    const classes = useStyles({height: 300, width: 500});

    const [isOpen, setOpen] = useState(false);
    const [coordinateParams, setCoordinateParams] = useState({transversal, vertical, type});

    const [deleteFetch, setDeleteFetch] = useState({start: false, success: false, fail: false});
    const [editFetch, setEditFetch] = useState({start: false, success: false, fail: false});

    const {start: editStart} = editFetch;

    const openModal = useCallback(() => {
        setOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setOpen(false);
    }, []);

    const handleDeleteCoordinate = useCallback(
        () => setDeleteFetch({start: true, success: false, fail: false}),
        []
    );

    const handleEditCoordinate = useCallback((event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        setEditFetch({start: true, success: false, fail: false});
        closeModal();
    }, []);

    useDeleteCoordinate({userID, projectID, stationID, coordinateID}, deleteFetch, setDeleteFetch);
    useEditCoordinate({userID, projectID, stationID, coordinateID}, editFetch, setEditFetch, {
        ...coordinateParams,
    });

    return (
        <>
            <Grid container xs={12} classes={{root: classes.container}}>
                <Grid container item justifyContent="space-around" alignItems="center" xs={10}>
                    <Box className={classes.listItemBoxRoot}>
                        <Typography className={classes.title}>TIPO</Typography>
                        <Typography>{(type || '-').toUpperCase()}</Typography>
                    </Box>
                    <Box className={classes.listItemBoxRoot}>
                        <Typography className={classes.title}>ORDEM</Typography>
                        <Typography>{order}</Typography>
                    </Box>
                    <Box className={classes.listItemBoxRoot}>
                        <Typography className={classes.title}>LONGITUDINAL</Typography>
                        <Typography>{longitudinal}</Typography>
                    </Box>

                    <Box className={classes.listItemBoxRoot}>
                        <Typography className={classes.title}>TRANSVERSAL</Typography>
                        <Typography>{transversal}</Typography>
                    </Box>

                    <Box className={classes.listItemBoxRoot}>
                        <Typography className={classes.title}>VERTICAL</Typography>
                        <Typography>{vertical}</Typography>
                    </Box>
                </Grid>

                <Grid container item xs={2}>
                    <IconButton onClick={openModal}>
                        <IconEdit />
                    </IconButton>
                    <IconButton onClick={handleDeleteCoordinate}>
                        <IconDelete />
                    </IconButton>
                </Grid>
            </Grid>

            <Modal open={isOpen} onClose={closeModal}>
                <Paper
                    className={classes.paper}
                    component="form"
                    onSubmit={handleEditCoordinate}
                    elevation={0}
                >
                    <Typography className={classes.title}>
                        {`EDITAR COORDENADA ${order} DA BALIZA ${stationName}`}
                    </Typography>

                    <Divider className={classes.divider} />

                    <Box className={classes.boxColumn}>
                        <FormInput
                            id="transversal"
                            label="Transversal"
                            type="number"
                            values={coordinateParams}
                            setValue={setCoordinateParams}
                            required
                        />
                        <FormInput
                            id="vertical"
                            label="Vertical"
                            type="number"
                            values={coordinateParams}
                            setValue={setCoordinateParams}
                            required
                        />
                    </Box>

                    <Divider className={classes.divider} />

                    <Box className={classes.buttonsBox}>
                        <Button
                            disabled={editStart}
                            variant="contained"
                            type="submit"
                            classes={{root: classes.buttonSubmit}}
                        >
                            Editar
                        </Button>

                        <Button
                            disabled={editStart}
                            variant="contained"
                            onClick={closeModal}
                            classes={{root: classes.buttonCancel}}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
};

export default StationCoordinate;

const useStyles = makeStyles((theme: Theme) =>
    createStyles<string, {height: number; width: number}>({
        container: {background: 'white'},

        paper: {
            padding: theme.spacing(2),
            position: 'absolute',
            height: ({height}) => `${height}px`,
            width: ({width}) => `${width}px`,
            top: ({height}) => `calc(50vh - ${height / 2}px)`,
            left: ({width}) => `calc(50vw - ${width / 2}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        divider: {height: '1px', width: '100%'},

        listItemBoxRoot: {
            minHeight: '0px',
            height: '48px',
            padding: `0px ${theme.spacing(2)}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        buttonsBox: {width: '100%', display: 'flex', justifyContent: 'space-around'},
        buttonSubmit: {
            color: '#FFF',
            fontWeight: 'bold',
            background: theme.palette.success.main,
            '&:hover': {
                background: theme.palette.success.dark,
            },
        },
        buttonCancel: {
            color: '#FFF',
            fontWeight: 'bold',
            background: theme.palette.error.main,
            '&:hover': {
                background: theme.palette.error.dark,
            },
        },
        title: {
            fontWeight: 'bold',
        },
    })
);
