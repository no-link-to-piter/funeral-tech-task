import React, { useState } from "react";
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from "react-redux";

import { FormTitle } from "components/common/FormTitle";
import { CustomField } from "components/common/CustomField";
import { CompanyModel, requestStatuses } from "models";
import { RootState } from "slices/rootReducer";
import { formatDate, formatDateISOStr } from "helpers";
import { FormRecord } from "components/common/FormRecord";
import { updateCompany } from "slices/companySlice";
import { AppDispatch } from "store";

import Schema from "./Schema";
import { formErrors } from "consts";

const CompanyForm = () => {

    const dispatch: AppDispatch = useDispatch();

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { company, status, error } = useSelector((state: RootState) => state.company);

    const mapInitialValues = (values: CompanyModel | null) => ({
        fullName: values?.name || "",
        contractNumber: values?.contract.no || "",
        contractDate: values ? formatDate(values.contract.issue_date) : "",
        businessEntity: values?.businessEntity || "",
        type: values && values.type.join(", ") || ""
    })

    const handleSubmit = (values: {fullName: string, contractNumber: string, contractDate: string, businessEntity: string, type: string}) => {
        if (company) {
            dispatch(updateCompany(Number(company.id), {name: values.fullName, contract: {no: values.contractNumber, issue_date: formatDateISOStr(values.contractDate)}, businessEntity: values.businessEntity, type: values.type.split(", ")}, () => setIsEdit(false)))
        }
    }

    const getContractText = (no: string, issueDate: string) => {
        if (issueDate && no) return `${no} от ${formatDate(issueDate)}`;
        return no || formatDate(issueDate)
    }

    const getChildren = () => {
        if (isEdit) {
            return (
                <>
                    <Field
                        type="text"
                        name="fullName"
                        label="Полное название"
                        autoComplete="none"
                        component={CustomField}/>
                    <Field
                        type="text"
                        name="contractNumber"
                        label="Номер договора"
                        autoComplete="none"
                        component={CustomField}/>
                    <Field
                        type="text"
                        name="contractDate"
                        label="Дата договора"
                        mask="99.99.9999"
                        autoComplete="none"
                        component={CustomField}/>
                    <Field
                        type="text"
                        name="businessEntity"
                        label="Форма"
                        autoComplete="none"
                        component={CustomField}/>
                    <Field
                        type="text"
                        name="type"
                        label="Тип"
                        autoComplete="none"
                        component={CustomField}/>
                </>
            )
        }
        return (
            <>
                <FormRecord
                    title="Полное название"
                    name="fullName"
                    text={company?.name || ""}/>
                <FormRecord
                    title="Договор"
                    name="contract"
                    text={company ? `${getContractText(company.contract.no, company.contract.issue_date)}` : ""}/>
                <FormRecord
                    title="Форма"
                    name="businessEntity"
                    text={company?.businessEntity || ""}/>
                <FormRecord
                    title="Тип"
                    name="type"
                    text={company ? company.type.join(", ") : ""}/>
            </>
        )
    }

    const children = getChildren();

    return (
        <Formik
            validationSchema={Schema}
            initialValues={mapInitialValues(company)}
            onSubmit={handleSubmit}
            enableReinitialize>
                {({ errors, setFieldError }) => {
                    if (status === requestStatuses.failed && error) {
                        if (error.toLowerCase().indexOf(formErrors.type.toLowerCase()) > -1 && !errors.type) {
                            setFieldError("type", error)
                        }
                    }
                    return (
                        <Form className="form" id="company-form">
                            <FormTitle
                                title="общая информация"
                                value={!isEdit}
                                form="company-form"
                                fn={() => setIsEdit(true)}/>
                            {children}
                        </Form>
                    )
                }}
        </Formik>
    )
}

export { CompanyForm }