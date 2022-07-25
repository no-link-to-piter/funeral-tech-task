import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { CardContent } from "components/common/CardContent";
import { CardHeader } from "components/common/CardHeader";
import { CardBody } from "components/common/CardBody";
import { ContactsForm } from "components/ContactsForm";
import { CompanyForm } from "components/CompanyForm";
import { ArrowIcon, DeleteIcon, LinkIcon, RefreshIcon } from "icons";
import { getCompany, getContact, resetToDefaults } from "slices/companySlice";
import { RootState } from "slices/rootReducer";
import { AppDispatch } from "store";
import { routes } from "routes";
import { SingleFieldForm } from "components/common/SingleFieldForm";
import { CompanyImages } from "components/CompanyImages";
import { ConfirmContext, OverlayContext } from "context";
import { copyText } from "helpers";
import { ErrorMessage } from "components/common/ErrorMessage";
import { useOnClickOutside } from "hooks/useOnClickOutside";

type Props = {
    companyId: string
}

const CompanyContainer = ({
    companyId
}: Props) => {

    const { pathname } = useLocation();

    const dispatch: AppDispatch = useDispatch();

    const { setConfirmCompanyId } = useContext(ConfirmContext);
    const { setIsOverlay } = useContext(OverlayContext);

    const { company, contact } = useSelector((state: RootState) => state.company);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const errorMessageRef = useRef<HTMLDivElement | null>(null);

    const handleClose = () => {
        setErrorMessage("")
    }

    useOnClickOutside(errorMessageRef, handleClose)

    useEffect(() => {
        if (company && (!contact || contact.id !== company.contactId)) {
            dispatch(getContact(Number(company.contactId)))
        }
    }, [dispatch, company, contact])

    useEffect(() => {
        if (companyId && (!company || company.id !== companyId)) {
            dispatch(getCompany(Number(companyId)))
        }
    }, [])

    useEffect(() => {
        return () => {
            dispatch(resetToDefaults())
        }
    }, [dispatch]);

    const handleDeleteCompany = () => {
        if (companyId) {
            setConfirmCompanyId(companyId);
            setIsOverlay(true)
        }
    }

    const handleRefreshData = () => {
        if (companyId) {
            dispatch(getCompany(Number(companyId)))
            if (company) {
                dispatch(getContact(Number(company.contactId)))
            }
        }
    }

    const handleCopyLink = () => {
        copyText(pathname)
    }

    return (
        <>
            <CSSTransition
                in={!!errorMessage}
                timeout={200}
                classNames={{
                  enter: 'error-message enter',
                  enterDone: 'error-message enter-done',
                  exit: 'error-message exit',
                  exitDone: 'error-message exit-done',
                }}
                unmountOnExit>
                    <div className="error-message" ref={errorMessageRef}>
                        <ErrorMessage
                            message={errorMessage}
                            handleClose={handleClose}/>
                    </div>
            </CSSTransition>
            <CardContent>
                <CardHeader>
                    <Link
                        className="card-header__link"
                        to={routes.home}>
                            <ArrowIcon/>
                            к списку юридических лиц
                    </Link>
                    <div className="card-header-btns">
                        <button
                            className="card-header-btns__button"
                            type="button"
                            onClick={handleCopyLink}>
                                <LinkIcon/>
                        </button>
                        {
                            company
                            &&
                            <>
                                <button
                                    className="card-header-btns__button"
                                    type="reset"
                                    onClick={handleRefreshData}>
                                        <RefreshIcon/>
                                </button>
                                <button
                                    className="card-header-btns__button"
                                    type="button"
                                    onClick={handleDeleteCompany}>
                                        <DeleteIcon/>
                                </button> 
                            </>
                            ||
                            null
                        }
                    </div>
                </CardHeader>
                <CardBody>
                    {
                        company
                        &&
                            <>
                            <SingleFieldForm
                                companyId={companyId}/>
                            <CompanyForm/>
                            {contact && <ContactsForm/> || null}
                            <CompanyImages
                                companyId={companyId}
                                setErrorMessage={setErrorMessage}/>
                        </>
                        ||
                        <h1 className="card-body__empty-title">Такой организации нет</h1>
                    }
                </CardBody>
            </CardContent>
        </>
    )
}

export { CompanyContainer };