import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';

interface Props {
    id: string;
    label: string;
    required?: boolean;
    type?: string;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    values: any;
    variant?: 'outlined' | 'filled' | 'standard';
}

const FormInput: React.FC<Props> = ({
    id,
    label,
    required,
    type = 'text',
    variant = 'outlined',
    values,
    setValue,
}) => {
    const classes = useStyles();

    const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = event.target;

        setValue({...values, [id]: value});
    };

    return (
        <TextField
            className={classes.textField}
            id={id}
            label={label}
            type={type}
            required={required}
            variant={variant}
            value={values[id]}
            onChange={handleTextInput}
        />
    );
};

export default FormInput;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            width: '100%',
            marginBottom: theme.spacing(3),
        },
    })
);
