import React from 'react';

import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {TextField, InputLabelProps, InputProps} from '@material-ui/core';

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
    variant = 'standard',
    values,
    setValue,
}) => {
    const classes = useStyles();
    const classInputLabel = useStylesInputLabelProps();
    const classInput = useStylesInputProps();

    const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = event.target;

        setValue({...values, [id]: value});
    };

    return (
        <TextField
            className={classes.textField}
            InputLabelProps={{classes: classInputLabel} as Partial<InputLabelProps>}
            InputProps={{classes: classInput} as Partial<InputProps>}
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
            marginTop: theme.spacing(2),
        },
    })
);

const useStylesInputLabelProps = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: 'none',
            color: theme.palette.primary.main,
        },
        focused: {},
    })
);

const useStylesInputProps = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            overflow: 'hidden',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            fontWeight: 'bold',
        },

        focused: {},
    })
);
