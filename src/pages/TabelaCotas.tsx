import React, {useCallback, useState} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Modal, List, Paper, Box, Fab, Typography, Tooltip} from '@material-ui/core';
import {Add as IconAdd} from '@material-ui/icons';

import DefaultTemplate from 'styles/templates';

import ListItemStation from 'components/tabelaCotas/ListItemStation';
import FormInput from 'components/shared/FormInput';

import useReduxStore from 'hooks/useReduxStore';
import useCreateStation from 'components/tabelaCotas/hooks/useCreateStation';

import type {TypeStation} from 'state/reducers/currentProject/types';
import type {TypeFetchStates} from 'types/hooks';

export type TypeStationsIndex = {
    name: string;
    value: string;
    argument: string;
}[];

export type TypeStationsData = TypeStation[];

const TabelaCotas: React.FC = () => {
    const {
        currentProject: {stations, id: projectID},
        user: {id: userID},
    } = useReduxStore();

    const [isOpen, setIsOpen] = useState(false);
    const [newStation, setNewStation] = useState({
        name: '',
        longitudinal: 0,
    });
    const [addStationStates, setAddStationStates] = useState<TypeFetchStates>({
        start: false,
        success: false,
        fail: false,
    });

    const {start} = addStationStates;

    const classes = useStyles({height: 300, width: 500});

    const handleCreateStation = useCallback((event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        setAddStationStates({
            start: true,
            success: false,
            fail: false,
        });
        setIsOpen(false);
    }, []);

    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => {
        setNewStation({
            name: '',
            longitudinal: 0,
        });
        setIsOpen(false);
    }, []);

    useCreateStation(
        {userID, projectID, params: newStation},
        addStationStates,
        setAddStationStates,
        setNewStation
    );

    return (
        <DefaultTemplate title="tabela de cotas">
            <Box className={classes.boxContainer}>
                <Box className={classes.boxStationsList}>
                    <Box className={classes.boxHeader}>
                        <Typography className={classes.typographyStationsList}>BALIZAS</Typography>
                        <Tooltip title="Criar uma nova baliza">
                            <Fab
                                color="primary"
                                disabled={addStationStates.start}
                                onClick={openModal}
                            >
                                <IconAdd />
                            </Fab>
                        </Tooltip>
                    </Box>

                    <Modal open={isOpen} onClose={closeModal}>
                        <Paper
                            square
                            component="form"
                            onSubmit={handleCreateStation}
                            className={classes.modal}
                        >
                            <Typography className={classes.title}>Criar Nova Baliza</Typography>

                            <FormInput
                                id="name"
                                label="Nome"
                                required
                                type=""
                                values={newStation}
                                setValue={setNewStation}
                            />

                            <FormInput
                                id="longitudinal"
                                label="Longitudinal"
                                type="number"
                                values={newStation}
                                setValue={setNewStation}
                                required
                            />

                            <Box className={classes.buttonsBox}>
                                <Button
                                    disabled={start}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Criar
                                </Button>

                                <Button
                                    disabled={start}
                                    onClick={closeModal}
                                    variant="contained"
                                    color="secondary"
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Paper>
                    </Modal>

                    <List component="nav" className={classes.list}>
                        {stations
                            .sort((a, b) => a.longitudinal - b.longitudinal)
                            .map(station => (
                                <ListItemStation key={station.id} station={station} />
                            ))}
                    </List>
                </Box>

                <Paper square className={classes.paper}>
                    GRAFICO
                </Paper>
            </Box>
        </DefaultTemplate>
    );
};

export default TabelaCotas;

const useStyles = makeStyles((theme: Theme) =>
    createStyles<string, {height: number; width: number}>({
        boxContainer: {display: 'flex', height: '100%'},
        boxHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing(2),
        },
        modal: {
            position: 'absolute',
            height: ({height}) => `${height}px`,
            width: ({width}) => `${width}px`,
            top: ({height}) => `calc(50vh - ${height / 2}px)`,
            left: ({width}) => `calc(50vw - ${width / 2}px)`,
            padding: theme.spacing(3),
        },
        title: {
            marginBottom: theme.spacing(2),
        },
        boxStationsList: {
            display: 'flex',
            flexDirection: 'column',
            width: '40%',
            marginRight: theme.spacing(3),
            background: 'none',
        },
        typographyStationsList: {fontSize: '16pt'},
        list: {
            maxHeight: '700px',
            overflowY: 'scroll',
            backgroundColor: theme.palette.background.paper,
        },
        paper: {width: '60%'},
        buttonsBox: {display: 'flex', justifyContent: 'space-between'},
    })
);
