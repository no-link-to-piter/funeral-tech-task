import React from "react";
import InputMask from 'react-input-mask';
import { clsx } from "clsx";

import { Field, FieldProps } from "formik";

import "./style.sass";

const CustomField = ({
    field,
    form: {handleChange, errors, touched},
    ...props
}: FieldProps & { label: string; disabled: boolean, type: string, mask?: string, autoComplete: string, className?: string }) => {

    const { label, type, mask, autoComplete, className } = props;

    const element = mask ? (
        <InputMask
            id={field.name}
            type={type}
            name={field.name}
            mask={mask}
            autoComplete={autoComplete}
            className={clsx("form-field__input", field.value && "is_filled", errors[field.name] && touched[field.name] && "is_error")}
            value={field.value}
            onChange={handleChange}/>
    ) : (
        <Field
            id={field.name}
            name={field.name}
            value={field.value}
            className={clsx("form-field__input", field.value && "is_filled", errors[field.name] && touched[field.name] && "is_error")}
            onChange={handleChange}/>
    );

    return (
        <div className={clsx("form-field", className && className)}>
            {element}
            <label htmlFor={field.name} className={clsx("form-field__label", field.value && "is_input_filled")}>{label}</label>
        </div>
    )
}

export { CustomField }