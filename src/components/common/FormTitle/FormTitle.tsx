import React from "react";
import clsx from "clsx";

import { EditIcon } from "icons";

import "./style.sass";

type Props = {
    title: string;
    value: boolean;
    form: string;
    fn: () => void;
}

const FormTitle = ({
    title, 
    value,
    form,
    fn
}: Props) => (
    <div className="form-header">
        <h1 className="form-header__text">{title}</h1>
        <button 
            type="submit"
            form={form}
            className={clsx("form-header__btn", value && "is_hidden")}>
                <EditIcon/>
        </button>
        <button 
            type="button"
            className={clsx("form-header__btn", value || "is_hidden")}
            onClick={fn}>
                <EditIcon/>
        </button>
    </div>
)

export { FormTitle };