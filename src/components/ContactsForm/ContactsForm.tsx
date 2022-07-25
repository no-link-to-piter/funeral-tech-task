import React, { useState } from "react";
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "slices/rootReducer";
import { FormTitle } from "components/common/FormTitle";
import { CustomField } from "components/common/CustomField";
import { FormRecord } from "components/common/FormRecord";
import { ContactModel } from "models";
import { updateContact } from "slices/companySlice";
import { AppDispatch } from "store";
import { formatPhoneNumber } from "helpers";

import Schema from "./Schema";

const ContactsForm = () => {

    const dispatch: AppDispatch = useDispatch();

    const { contact } = useSelector((state: RootState) => state.company)

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const mapInitialValues = (values: ContactModel | null) => ({
        firstname: values?.firstname || "",
        lastname: values?.lastname || "",
        patronymic: values?.patronymic || "",
        phone: values?.phone || "",
        email: values?.email || ""
    })

    const handleSubmit = (values: {firstname: string, lastname: string, patronymic: string, phone: string, email: string}) => {
        if (contact) {
            const phone = values.phone ? values.phone.replace(/^(\+)|\D/g, "") : "";
            dispatch(updateContact(Number(contact.id), {...values, phone}, () => setIsEdit(false)))
        }
    }

    const getChildren = () => {
        if (isEdit) {
            return (
                <>
                    <Field
                        type="text"
                        name="firstname"
                        label="Имя"
                        autoComplete="none"
                        component={CustomField}/>
                    <Field
                        type="text"
                        name="lastname"
                        label="Фамилия"
                        autoComplete="none"
                        component={CustomField}/>
                    <Field
                        type="text"
                        name="patronymic"
                        label="Отчество"
                        autoComplete="none"
                        component={CustomField}/>
                    <Field
                        type="text"
                        name="phone"
                        label="Телефон"
                        mask="+7 (999) 999-99-99"
                        autoComplete="none"
                        component={CustomField}/>
                    <Field
                        type="text"
                        name="email"
                        label="Эл. почта"
                        autoComplete="none"
                        component={CustomField}/>
                </>
            )
        }
        return (
            <>
                <FormRecord
                    title="ФИО"
                    name="fullName"
                    text={contact ? `${contact.firstname} ${contact.lastname} ${contact.patronymic}` : ""}/>
                <FormRecord
                    title="Телефон"
                    name="phone"
                    text={contact ? formatPhoneNumber(contact.phone) : ""}/>
                <FormRecord
                    title="Эл. почта"
                    name="email"
                    text={contact?.email || ""}/>
            </>
        )
    }

    const children = getChildren();

    return (
        <Formik
            validationSchema={Schema}
            initialValues={mapInitialValues(contact)}
            onSubmit={handleSubmit}
            enableReinitialize>
                {() => (
                    <Form className="form is_contacts" id="contact-form">
                        <FormTitle
                            title="контактные данные"
                            value={!isEdit}
                            form="contact-form"
                            fn={() => setIsEdit(true)}/>
                        {children}
                    </Form>
                )}
        </Formik>
    )
}

export { ContactsForm }