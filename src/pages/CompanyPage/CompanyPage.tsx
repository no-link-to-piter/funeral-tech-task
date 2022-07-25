import React from "react";
import { useParams } from "react-router-dom";

import { CompanyContainer } from "containers/CompanyContainer";

const CompanyPage = () => {

    const params = useParams<{ companyId: string }>();
    const { companyId } = params;

    return (
        <CompanyContainer
            companyId={companyId || ""}/>
    )
}

export { CompanyPage };