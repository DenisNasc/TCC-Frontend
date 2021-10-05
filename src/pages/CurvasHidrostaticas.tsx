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

const formtNumber = (len = 4) => (amount?: string | number) => {
    const numberFormated = `${amount || 0}`;

    const [first, second] = numberFormated.split('.');

    const decimals = second || '';
    const zeroArrays = new Array(len - decimals.length).fill(0);

    return `${first}.${second || ''}${zeroArrays.join('')}`;
};

const CurvasHidrostaticas: React.FC = () => {
    const dispatch = useDispatch();
    const axiosDev = axiosDevInstance();

    const classes = useStyles();

    const {
        currentProject: {id: projectID, userID, name},
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

    const formt4decimals = formtNumber();

    return (
        <DefaultTemplate title={`${name} - Curvas Hidrostaticas`}>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead classes={{root: classes.tableHeadRoot}}>
                        <TableRow>
                            <TableCell classes={{root: classes.tableHeadCell}} align="left">
                                Calado [m]
                            </TableCell>
                            <TableCell classes={{root: classes.tableHeadCell}} align="center">
                                Volume [m³]
                            </TableCell>
                            <TableCell classes={{root: classes.tableHeadCell}} align="center">
                                Deslocamento [ton]
                            </TableCell>
                            <TableCell classes={{root: classes.tableHeadCell}} align="center">
                                LCB [m]
                            </TableCell>
                            <TableCell classes={{root: classes.tableHeadCell}} align="center">
                                VCB [m]
                            </TableCell>
                            <TableCell classes={{root: classes.tableHeadCell}} align="center">
                                KMT [m]
                            </TableCell>
                            <TableCell classes={{root: classes.tableHeadCell}} align="center">
                                MT1
                            </TableCell>
                            <TableCell classes={{root: classes.tableHeadCell}} align="center">
                                LCF
                            </TableCell>
                            <TableCell classes={{root: classes.tableHeadCell}} align="center">
                                CB
                            </TableCell>
                            <TableCell classes={{root: classes.tableHeadCell}} align="center">
                                CP
                            </TableCell>
                            <TableCell classes={{root: classes.tableHeadCell}} align="center">
                                Superfície Molhada [m²]
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {hidro.map((value, i) => (
                            <TableRow key={drafts[i]}>
                                <TableCell classes={{root: classes.tableBodyCell}} align="center">
                                    {formt4decimals(drafts[i])}
                                </TableCell>
                                <TableCell classes={{root: classes.tableBodyCell}} align="center">
                                    {formt4decimals(value.volume)}
                                </TableCell>
                                <TableCell classes={{root: classes.tableBodyCell}} align="center">
                                    {formt4decimals(value.displacement)}
                                </TableCell>
                                <TableCell classes={{root: classes.tableBodyCell}} align="center">
                                    {formt4decimals(value.LCB)}
                                </TableCell>
                                <TableCell classes={{root: classes.tableBodyCell}} align="center">
                                    {formt4decimals(value.VCB)}
                                </TableCell>
                                <TableCell classes={{root: classes.tableBodyCell}} align="center">
                                    {formt4decimals(value.KMT)}
                                </TableCell>
                                <TableCell classes={{root: classes.tableBodyCell}} align="center">
                                    {formt4decimals(value.MT1)}
                                </TableCell>
                                <TableCell classes={{root: classes.tableBodyCell}} align="center">
                                    {formt4decimals(value.LCF)}
                                </TableCell>
                                <TableCell classes={{root: classes.tableBodyCell}} align="center">
                                    {formt4decimals(value.CB)}
                                </TableCell>
                                <TableCell classes={{root: classes.tableBodyCell}} align="center">
                                    {formt4decimals(value.CP)}
                                </TableCell>
                                <TableCell classes={{root: classes.tableBodyCell}} align="center">
                                    {formt4decimals(value.wetedSurface)}
                                </TableCell>
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
        tableHeadRoot: {},
        tableHeadCell: {
            backgroundColor: theme.palette.background.paper,
            fontSize: theme.typography.fontSize * 1.2,
            fontWeight: 'bold',
        },
        tableBodyCell: {
            backgroundColor: theme.palette.background.default,
        },
    })
);
