import React, {useState, useCallback} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Divider, Modal, Paper, Typography, IconButton, Box} from '@material-ui/core';
import {Edit as IconEdit, Delete as IconDelete} from '@material-ui/icons';

import FormInput from 'components/shared/FormInput';

import useDeleteCoordinate from './hooks/useDeleteCoordinate';
import useEditCoordinate from './hooks/useEditCoordinate';

interface Props {
    userID: string;
    projectID: string;
    stationID: string;
    coordinateID: string;

    type: string | number | undefined;
    longitudinal: string | number;
    transversal: string | number;
    vertical: string | number;
}

const StationCoordinate: React.FC<Props> = ({
    userID,
    projectID,
    stationID,
    coordinateID,
    type,
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
            <Box className={classes.boxType}>
                <Typography className={classes.typography}>Tipo</Typography>
                <Typography className={classes.typography}>{type || '1'}</Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box className={classes.boxCoordinates}>
                <Box className={classes.listItemBoxRoot}>
                    <Typography className={classes.typography}>Longitudinal</Typography>
                    <Typography className={classes.typography}>{longitudinal}</Typography>
                </Box>

                <Box className={classes.listItemBoxRoot}>
                    <Typography className={classes.typography}>Transversal</Typography>
                    <Typography className={classes.typography}>{transversal}</Typography>
                </Box>

                <Box className={classes.listItemBoxRoot}>
                    <Typography className={classes.typography}>Vertical</Typography>
                    <Typography className={classes.typography}>{vertical}</Typography>
                </Box>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box className={classes.boxActions}>
                <IconButton onClick={openModal}>
                    <IconEdit />
                </IconButton>
                <IconButton onClick={handleDeleteCoordinate}>
                    <IconDelete />
                </IconButton>
            </Box>

            <Modal open={isOpen} onClose={closeModal}>
                <Paper
                    className={classes.paper}
                    component="form"
                    onSubmit={handleEditCoordinate}
                    elevation={0}
                >
                    <Typography className={classes.typography}>EDITAR COORDENADAS</Typography>

                    <Box className={classes.boxContainer}>
                        <Box className={classes.boxColumn}>
                            <Typography className={classes.title}>INFORMAÇÕES GERAIS</Typography>
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
        listItemBoxRoot: {
            minHeight: '0px',
            height: '48px',
            padding: `0px ${theme.spacing(2)}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        boxType: {
            width: '60px',
            padding: `0px ${theme.spacing(2)}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        boxCoordinates: {
            display: 'flex',
            justifyContent: 'space-between',
            background: 'none',
            width: '70%',
        },
        boxActions: {
            display: 'flex',
            width: '20%',
        },
        typography: {
            fontSize: '14px',
            color: '#000',
        },
    })
);
