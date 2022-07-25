import React from "react";

import { CloseIcon } from "icons";

import './style.sass';

type Props = {
    message: string;
    handleClose: () => void;
}

const ErrorMessage = ({
    message,
    handleClose
}: Props) => (
    <>
        <button
            type="button"
            className="error-message__close"
            onClick={handleClose}>
                <CloseIcon/>
        </button>
        <p className="error-message__text">{message}</p>
    </>
)

export { ErrorMessage };