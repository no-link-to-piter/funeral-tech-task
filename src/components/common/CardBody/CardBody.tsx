import React from "react";

import "./style.sass";

type Props = {
    children: JSX.Element[] | JSX.Element
}

const CardBody = ({
    children
}: Props) => {
    return (
        <div className="card-body">
            {children}
        </div>
    )
}

export { CardBody };