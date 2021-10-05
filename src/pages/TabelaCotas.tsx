import React, {useCallback, useState} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Grid, Button, Modal, List, Paper, Box, Fab, Typography, Tooltip} from '@material-ui/core';
import {Add as IconAdd} from '@material-ui/icons';

import DefaultTemplate from 'styles/templates';

import ListItemStation from 'components/tabelaCotas/ListItemStation';
import FormInput from 'components/shared/FormInput';

import useStore from 'hooks/useReduxStore';
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
        currentProject: {stations, id: projectID, name},
        user: {id: userID},
    } = useStore();

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
        <DefaultTemplate title={`${name} - Tabela de Cotas`}>
            <>
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    className={classes.container}
                >
                    <Grid container item xs={6} direction="column">
                        <Box className={classes.boxHeader}>
                            <Typography align="center" className={classes.title}>
                                BALIZAS
                            </Typography>

                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<IconAdd />}
                                onClick={openModal}
                            >
                                CRIAR BALIZA
                            </Button>
                        </Box>

                        <List component="nav" className={classes.list}>
                            {stations
                                .sort((a, b) => a.longitudinal - b.longitudinal)
                                .map(station => (
                                    <ListItemStation key={station.id} station={station} />
                                ))}
                        </List>
                    </Grid>

                    {/* <Grid container item xs={6}>
                        <Paper square>GRAFICO</Paper>
                    </Grid> */}
                </Grid>

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
            </>
        </DefaultTemplate>
    );
};

export default TabelaCotas;

const useStyles = makeStyles((theme: Theme) =>
    createStyles<string, {height: number; width: number}>({
        container: {width: '100%'},
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
            fontSize: theme.typography.fontSize * 1.5,
            fontWeight: 'bold',
        },

        list: {
            maxHeight: 'calc(100vh - 60px - 48px - 36px - 24px - 56px - 16px)',
            overflowY: 'auto',
            backgroundColor: theme.palette.background.paper,
        },

        buttonsBox: {display: 'flex', justifyContent: 'space-between', marginTop: theme.spacing(2)},
    })
);
