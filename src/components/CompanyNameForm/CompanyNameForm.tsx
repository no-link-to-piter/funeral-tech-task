import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import clsx from "clsx";

import { RootState } from "slices/rootReducer";
import { CustomField } from "components/common/CustomField";
import { CompanyModel } from "models";
import { EditIcon } from "icons";
import { AppDispatch } from "store";
import { updateCompany } from "slices/companySlice";

import Schema from "./Schema";
import "./style.sass";

type Props = {
    companyId: string
}

const CompanyNameForm = ({
    companyId
}: Props) => {

    const dispatch: AppDispatch = useDispatch();

    const { company } = useSelector((state: RootState) => state.company);

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const mapInitialValues = (values: CompanyModel | null) => ({
        name: values?.shortName || ""
    });

    const handleSubmit = (values: {name: string}) => {
        if (companyId) {
            dispatch(updateCompany(Number(companyId), {shortName: values.name}, () => setIsEdit(false)));
        }
    }

    return (
        <Formik
            validationSchema={Schema}
            initialValues={mapInitialValues(company)}
            onSubmit={handleSubmit}
            enableReinitialize>
                {() => (
                    <Form className="single-field-form" id="company-name-form">
                        <Field
                            type="text"
                            name="name"
                            label="Название компании"
                            autoComplete="none"
                            component={CustomField}
                            className={clsx(isEdit || "is_hidden")}/>
                        <button
                            type="submit"
                            form="company-name-form"
                            className={clsx("single-field-form__button", isEdit || "is_hidden")}>
                                <EditIcon/>
                        </button>
                        <p className={clsx("single-field-form__text", isEdit && "is_hidden")}>{company?.shortName}</p>
                        <button
                            type="button"
                            className={clsx("single-field-form__button", isEdit && "is_hidden")}
                            onClick={() => setIsEdit(true)}>
                                <EditIcon/>
                        </button>
                    </Form>
                )}
        </Formik>
    )
}

export { CompanyNameForm }