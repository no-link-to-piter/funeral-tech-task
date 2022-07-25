import React from "react";

import './style.sass';

type Props = {
    title: string;
    name: string;
    text: string;
}

const FormRecord = ({
    title,
    name,
    text
}: Props) => (
    <div className="form-record">
        <p className="form-record__title">{title}:</p>
        { name === "email" && <a href={`mailto:${text}`} className="form-record__text is_link">{text}</a> ||  <p className="form-record__text">{text}</p> }
    </div>
)

export { FormRecord }