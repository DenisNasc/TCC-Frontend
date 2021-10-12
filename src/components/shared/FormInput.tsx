import React from 'react';

import {styled} from '@mui/material/styles';
import {TextField, InputLabelProps, InputProps} from '@mui/material';

interface Props {
    id: string;
    label: string;
    required?: boolean;
    type?: string;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    values: any;
    variant?: 'filled' | 'outlined' | 'standard';
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
    const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = event.target;

        setValue({...values, [id]: value});
    };

    return (
        <InputForm
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

const InputForm = styled(TextField)();
