import React, {useState, useEffect} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {List, ListSubheader, Paper, Box, Typography} from '@material-ui/core';

import {Palette} from '@devexpress/dx-react-chart';
import {schemeAccent} from 'd3-scale-chromatic';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';

import ListItemStation from 'components/tabelaCotas/ListItemStation';
import ChartStation from 'components/tabelaCotas/ChartStation';

import useReduxStore from 'hooks/useReduxStore';

import DefaultTemplate from 'styles/templates';

import type {TypeStation} from 'state/reducers/currentProject/types';

const TabelaCotas: React.FC = () => {
    const {
        currentProject: {stations},
    } = useReduxStore();

    const [stationsIndex, setStationsIndex] = useState<
        {
            name: string;
            value: string;
            argument: string;
        }[]
    >([]);
    const [stationsData, setStationsData] = useState<TypeStation[]>([]);

    const classes = useStyles();

    useEffect(() => {
        if (!stations) return;
        const index = stations.map(e => ({
            name: e.name.replace(/ /g, '_'),
            value: `vertical_${e.name.replace(/ /g, '_')}`,
            argument: `transversal_${e.name.replace(/ /g, '_')}`,
        }));

        setStationsIndex(index);

        const stationsDataFormated = stations
            .map(station =>
                station.coordinates.map(coordinate => {
                    const olalala: any = {};
                    olalala[`vertical_${station.name.replace(/ /g, '_')}`] = coordinate.vertical;
                    olalala[`transversal_${station.name.replace(/ /g, '_')}`] =
                        coordinate.transversal;

                    return olalala;
                })
            )
            .reduce((previous, value) => [...value]);

        console.log(stationsDataFormated);

        setStationsData(stationsDataFormated);
    }, [stations]);

    return (
        <DefaultTemplate title="tabela de cotas">
            <Box className={classes.boxContainer}>
                <Paper elevation={0} square className={classes.paperStationsList}>
                    <Typography variant="h3" className={classes.typographyStationsList}>
                        Balizas
                    </Typography>
                    <List component="nav" className={classes.list}>
                        {stations.map(station => (
                            <ListItemStation station={station} />
                        ))}
                    </List>
                </Paper>

                <Paper square className={classes.paper}>
                    <Chart data={stationsData}>
                        <Palette scheme={schemeAccent} />
                        <Title text="Balizas" />
                        <Legend />
                        <ArgumentAxis />
                        <ValueAxis showTicks showLine showGrid={false} />

                        {/* {stationsIndex.map(e => (
                            <ChartStation argument={e.value} name={e.name} value={e.argument} />
                        ))} */}
                    </Chart>
                </Paper>
            </Box>
        </DefaultTemplate>
    );
};

export default TabelaCotas;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        boxContainer: {display: 'flex'},
        paperStationsList: {
            display: 'flex',
            flexDirection: 'column',
            width: '40%',
            marginRight: theme.spacing(3),
        },
        typographyStationsList: {},
        list: {maxHeight: '500px', overflowY: 'scroll'},
        paper: {width: '60%'},
    })
);
