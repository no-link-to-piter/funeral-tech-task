import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { DeleteIcon } from "icons";
import { RootState } from "slices/rootReducer";
import { routes } from "routes";

import "./style.sass";

type Props = {
    handleDeleteCompany: (value: string) => void;
}

const CompanyList = ({
    handleDeleteCompany,
}: Props) => {

    const { companyList } = useSelector((state: RootState) => state.company);

    const children = companyList && companyList.results.length && companyList.results.map(item => (
        <div className="company-item" key={item.id}>
            <Link 
                to={routes.company(item.id)}
                className="company-item__content">
                <h2 
                    className="company-item__name">{item.name}</h2>
            </Link>
            <button
                type="button"
                className="company-item__delete"
                onClick={() => handleDeleteCompany(item.id)}>
                    <DeleteIcon/>
            </button>
        </div>
    )) || null;

    return (
        <div className="company-list">
            {children}
        </div>
    )
}

export { CompanyList };