import React from "react";
import { Field, Form, Formik } from "formik";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CustomField } from "components/common/CustomField";
import { STORAGE_KEY } from "consts";
import { routes } from "routes";
import { AppDispatch } from "store";
import { authUser } from "slices/authSlice";
import { RootState } from "slices/rootReducer";

import "./style.sass";
import Schema from "./Schema";

const LoginPage = () => {

    const dispatch: AppDispatch = useDispatch();

    const { username } = useSelector((state: RootState) => state.auth)

    const handleSubmit = (values: {username: string}) => {
        dispatch(authUser(values.username))
    }

    if (localStorage.getItem(STORAGE_KEY) || username) {
        return <Navigate to={routes.home}/>
    }

    return (
        <Formik
            initialValues={{username: ""}}
            validationSchema={Schema}
            onSubmit={handleSubmit}>
                {() => (
                    <Form className="auth-form">
                        <h1 className="auth-form__title">Авторизация</h1>
                        <Field
                            type="text"
                            name="username"
                            label="username"
                            autoComplete="none"
                            component={CustomField}/>
                        <button 
                            type="submit"
                            className="auth-form__button">
                                Войти
                        </button>
                    </Form>
                )}
        </Formik>
    )
}

export { LoginPage }