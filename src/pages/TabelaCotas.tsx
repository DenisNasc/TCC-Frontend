import React, {useState, useEffect} from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Collapse, List, ListSubheader, ListItem, ListItemText, Paper, Box} from '@material-ui/core';
import {ExpandMore as IconExpandMore, ExpandLess as IconExpandLess} from '@material-ui/icons';

import {Palette} from '@devexpress/dx-react-chart';
import {schemeAccent} from 'd3-scale-chromatic';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';

import ChartStation from 'components/tabelaCotas/ChartStation';

import useReduxStore from 'hooks/useReduxStore';

import DefaultTemplate from 'styles/templates';

import type {TypeStation} from 'state/reducers/project/types';

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
    const [isOpen, setOpen] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        if (!stations) return;
        const index = stations.map(e => ({
            name: e.name,
            value: `vertical_${e.name}`,
            argument: `transversal_${e.name}`,
        }));

        setStationsIndex(index);

        const stationsDataFormated = stations
            .map(station =>
                station.coordinates.map(coordinate => {
                    const olalala: any = {};
                    olalala[`vertical_${station.name}`] = coordinate.vertical;
                    olalala[`transversal_${station.name}`] = coordinate.transversal;

                    return olalala;
                })
            )
            .reduce((previous, value) => [...previous, ...value]);

        setStationsData(stationsDataFormated);
    }, [stations]);

    const handleOpenCollapse = () => setOpen(!isOpen);

    return (
        <DefaultTemplate title="tabela de cotas">
            <Box className={classes.box}>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Nested List Items
                        </ListSubheader>
                    }
                    className={classes.list}
                >
                    {stations.map(station => (
                        <>
                            <ListItem button onClick={handleOpenCollapse}>
                                <ListItemText primary={station.name} />
                                <ListItemText primary={`Longitudinal: ${station.longitudinal}`} />
                                {isOpen ? <IconExpandLess /> : <IconExpandMore />}
                            </ListItem>
                            <Collapse
                                in={isOpen}
                                timeout="auto"
                                unmountOnExit
                                className={classes.collapse}
                            >
                                <List component="div" disablePadding>
                                    {station.coordinates.map(point => (
                                        <ListItem button>
                                            <ListItemText
                                                primary={`Ponto ${point.order}`}
                                                className={classes.listItemText}
                                            />
                                            <ListItemText
                                                primary={`Longitudinal: ${station.longitudinal}`}
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
                    ))}
                </List>

                <Paper square className={classes.paper}>
                    <Chart data={stationsData}>
                        <Palette scheme={schemeAccent} />
                        <Title text="Balizas" />
                        <Legend />
                        <ArgumentAxis />
                        <ValueAxis showTicks showLine showGrid={false} />

                        {stationsIndex.map(e => (
                            <ChartStation argument={e.value} name={e.name} value={e.argument} />
                        ))}
                    </Chart>
                </Paper>
            </Box>
        </DefaultTemplate>
    );
};

export default TabelaCotas;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {display: 'flex'},
        list: {width: '40%', maxHeight: '500px', overflowY: 'scroll'},
        paper: {width: '60%'},
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
