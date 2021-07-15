import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Paper, List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import {
    Home as IconHome,
    Person as IconPerson,
    Settings as IconSettings,
    Work as IconWork,
    ExitToApp as IconExitToApp,
} from '@material-ui/icons';

import {USER_CREATE_PROJECT} from 'state/actions/user';

import FormInput from 'components/shared/FormInput';

const itens = [
    {title: 'Home', icon: IconHome, path: '/home/'},
    {title: 'User', icon: IconPerson, path: '/user/'},
    {title: 'Projects', icon: IconWork, path: '/projects/'},
    {title: 'Configurações', icon: IconSettings, path: '/settings/'},
];

const LateralMenu: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {push} = useHistory();

    const [formValues, setFormValues] = useState({
        project: '',
        engineer: '',
        shipyard: '',
    });

    const createNewProject = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        // VERIFICAR SE OS DADOS DO NOVO PROJETO ESTÃO VÁLIDOS
        // ENVIAR OS DADOS DO NOVO PROJETO PARA O BANCO DE DADOS
        // RECEBER A NOVA LISTA DE PROJETOS

        // ENVIAR A NOVA LISTA DE PROJETOS PRO REDUCER USER
        dispatch({type: USER_CREATE_PROJECT, payload: {...formValues}});
    };

    const pushToPage = useCallback(
        (path: string) => () => {
            push(path);
        },
        [push]
    );

    return (
        <Paper elevation={0} className={classes.paper}>
            <List className={classes.list}>
                {itens.map(e => (
                    <ListItem
                        key={e.title}
                        button
                        divider
                        onClick={pushToPage(e.path)}
                        className={classes.listItem}
                    >
                        <ListItemIcon>
                            <e.icon />
                        </ListItemIcon>
                        <ListItemText primary={e.title} />
                    </ListItem>
                ))}

                <ListItem selected button onClick={() => {}} className={classes.logoutButton}>
                    <ListItemIcon>
                        <IconExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Sair" />
                </ListItem>

                {/* // <Collapse in={isOpen} className={classes.collapse} timeout="auto" unmountOnExit>
                //     <Paper
                //         component="form"
                //         className={classes.collapsePaper}
                //         onSubmit={createNewProject}
                //     >
                //         <FormInput
                //             id="project"
                //             label="Project Name"
                //             type="text"
                //             required
                //             values={formValues}
                //             setValue={setFormValues}
                //             variant="standard"
                //         />
                //         <FormInput
                //             id="engineer"
                //             label="Engineer"
                //             type="text"
                //             required
                //             values={formValues}
                //             setValue={setFormValues}
                //             variant="standard"
                //         />
                //         <FormInput
                //             id="shipyard"
                //             label="Shipyard"
                //             type="text"
                //             required
                //             values={formValues}
                //             setValue={setFormValues}
                //             variant="standard"
                //         />
                //         <Box className={classes.collapseActions}>
                //             <IconButton
                //                 onClick={openCloseCollapse}
                //                 disableFocusRipple
                //                 disabled={!isOpen}
                //                 className={classes.buttonClose}
                //             >
                //                 <IconClose />
                //             </IconButton>
                //             <IconButton
                //                 disableFocusRipple
                //                 disabled={!isOpen}
                //                 className={classes.buttonCheck}
                //                 type="submit"
                //             >
                //                 <IconCheck />
                //             </IconButton>
                //         </Box>
                //     </Paper>
                // </Collapse> */}
            </List>
        </Paper>
    );
};

export default LateralMenu;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            borderRadius: '0px',
            height: '100%',
            width: '100%',
            paddingTop: `${theme.spacing(2)}px`,
        },
        list: {
            height: '100%',
            margin: '0px',
            padding: '0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        listItem: {
            width: '100%',
            margin: '0px',
            padding: `${theme.spacing(1)}px 0px`,
        },
        logoutButton: {
            width: '100%',
            margin: '0px',
            padding: `${theme.spacing(1)}px 0px`,
            bottom: '0',
            color: 'red',
        },
        buttonNewProject: {
            width: '100%',
        },
        collapse: {
            width: '90%',
        },
        collapsePaper: {padding: theme.spacing(2)},
        collapseTitle: {textAlign: 'center'},
        collapseActions: {display: 'flex', justifyContent: 'flex-end'},
        buttonClose: {color: theme.palette.error.main},
        buttonCheck: {color: theme.palette.success.main},
    })
);
