import React from "react";

import "./style.sass";

type Props = {
    children: JSX.Element[] | JSX.Element;
}

const CardContent = ({
    children
}: Props) => (
    <div className="card-content">
        {children}
    </div>
)

export { CardContent }