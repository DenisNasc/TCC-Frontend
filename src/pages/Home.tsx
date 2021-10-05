import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Box, Grid} from '@material-ui/core';

import DefaultTemplate from 'styles/templates';

import useReduxStore from 'hooks/useReduxStore';

import SearchFIeld from 'components/home/SearchFIeld';
import CreateNewProject from 'components/home/CreateProject';
import ProjectsTable from 'components/home/ProjectsTable';

const Home: React.FC = () => {
    const classes = useStyles();
    const {
        user: {projects},
    } = useReduxStore();

    return (
        <DefaultTemplate title="home">
            <Grid container item>
                <Grid
                    container
                    item
                    justifyContent="space-between"
                    xs={12}
                    className={classes.grid1}
                >
                    <SearchFIeld />
                    <CreateNewProject />
                </Grid>

                <Grid container item xs={12}>
                    <ProjectsTable rows={projects} />
                </Grid>
            </Grid>
        </DefaultTemplate>
    );
};

export default Home;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid1: {marginBottom: theme.spacing(3)},
    })
);
