import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {Button, Modal, Paper} from '@material-ui/core';
import {Add as IconAdd} from '@material-ui/icons';

const CreateNewProject: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles({height: 300, width: 300});

    // useEffect(() => {
    //     const createNewProject = async () => {
    //         try {
    //             await axiosDevInstance({Authentication: `jwt ${token}`}).post(
    //                 `/users/${id}/projects`,
    //                 {}
    //             );
    //             setFetchStates({start: false, success: true, fail: false});
    //         } catch (error) {
    //             setFetchStates({start: false, success: false, fail: true});
    //             console.log(error.message);
    //         }
    //     };

    //     createNewProject();
    // }, [start]);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<IconAdd />}
                onClick={openModal}
                className={classes.button}
                disabled={isOpen}
            >
                Novo Projeto
            </Button>
            <Modal open={isOpen} onClose={closeModal}>
                <Paper className={classes.paper}>oi</Paper>
            </Modal>
        </>
    );
};

export default CreateNewProject;

const useStyles = makeStyles((theme: Theme) =>
    createStyles<string, {height: number; width: number}>({
        button: {height: '48px'},
        paper: {
            position: 'absolute',
            height: ({height}) => `${height}px`,
            width: ({width}) => `${width}px`,
            top: ({height}) => `calc(50vh - ${height / 2}px)`,
            left: ({width}) => `calc(50vw - ${width / 2}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    })
);
