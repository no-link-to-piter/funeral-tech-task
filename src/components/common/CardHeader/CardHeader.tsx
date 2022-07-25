import React from "react";

import "./style.sass";

type Props = {
    children: JSX.Element[] | JSX.Element;
}

const CardHeader = ({
    children
}: Props) => (
    <div className="card-header">
        {children}
    </div>
)

export { CardHeader }