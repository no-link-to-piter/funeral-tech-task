import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCompanies } from "slices/companySlice";
import { AppDispatch } from "store";
import { COMPANY_ID } from "consts";
import { CompanyList } from "components/CompanyList";
import { CardContent } from "components/common/CardContent";
import { CardHeader } from "components/common/CardHeader";
import { CardBody } from "components/common/CardBody";
import { ConfirmContext, OverlayContext } from "context";

const MainContainer = () => {

    const dispatch: AppDispatch = useDispatch();
    const {setConfirmCompanyId} = useContext(ConfirmContext);
    const {setIsOverlay} = useContext(OverlayContext);

    useEffect(() => {
        dispatch(getCompanies(COMPANY_ID))
    }, [])

    const handleDeleteCompany = (value: string) => {
        setConfirmCompanyId(value);
        setIsOverlay(true)
    }

    return (
        <CardContent>
            <CardHeader>
                <h1 className="card-header__title">список юридических лиц</h1>
            </CardHeader>
            <CardBody>
                <CompanyList
                    handleDeleteCompany={handleDeleteCompany}/>
            </CardBody>
        </CardContent>
    )
}
export { MainContainer };