import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from '@material-ui/core';

import DefaultTemplate from 'styles/templates';

import useStore from 'hooks/useReduxStore';
import {axiosDevInstance} from 'fetch/axiosInstances';
import {
    HIDROSTATICS_UPDATE_DRAFTS,
    HIDROSTATICS_UPDATE_HIDROSTATICS,
} from 'state/actions/hidrostatics';

const CurvasHidrostaticas: React.FC = () => {
    const dispatch = useDispatch();
    const axiosDev = axiosDevInstance();

    const classes = useStyles();

    const {
        currentProject: {id: projectID, userID},
        hidrostatics: {drafts, hidrostatics: hidro},
    } = useStore();

    useEffect(() => {
        const fetchHidrostatics = async () => {
            const url = `/users/${userID}/projects/${projectID}/hidrostatics`;
            const {data} = await axiosDev.get(url);

            console.log(data);

            dispatch({type: HIDROSTATICS_UPDATE_DRAFTS, payload: {drafts: data.drafts}});

            dispatch({
                type: HIDROSTATICS_UPDATE_HIDROSTATICS,
                payload: {hidrostatics: data.hidrostatics},
            });
        };

        fetchHidrostatics();
    }, []);

    return (
        <DefaultTemplate title="curvas hidrostaticas">
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Calado [m]</TableCell>
                            <TableCell align="center">Volume [m³]</TableCell>
                            <TableCell align="center">Deslocamento [ton]</TableCell>
                            <TableCell align="center">LCB [m]</TableCell>
                            <TableCell align="center">VCB [m]</TableCell>
                            <TableCell align="center">KMT [m]</TableCell>
                            <TableCell align="center">MT1</TableCell>
                            <TableCell align="center">LCF</TableCell>
                            <TableCell align="center">CB</TableCell>
                            <TableCell align="center">CP</TableCell>
                            <TableCell align="center">Superfície Molhada [m²]</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {hidro.map((value, i) => (
                            <TableRow key={drafts[i]}>
                                <TableCell align="left">{drafts[i]}</TableCell>
                                <TableCell align="center">{value.volume || 0}</TableCell>
                                <TableCell align="center">{value.displacement || 0}</TableCell>
                                <TableCell align="center">{value.LCB || 0}</TableCell>
                                <TableCell align="center">{value.VCB || 0}</TableCell>
                                <TableCell align="center">{value.KMT || 0}</TableCell>
                                <TableCell align="center">{value.MT1 || 0}</TableCell>
                                <TableCell align="center">{value.LCF || 0}</TableCell>
                                <TableCell align="center">{value.CB || 0}</TableCell>
                                <TableCell align="center">{value.CP || 0}</TableCell>
                                <TableCell align="center">{value.wetedSurface || 0}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DefaultTemplate>
    );
};

export default CurvasHidrostaticas;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {},
    })
);
