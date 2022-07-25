import React from "react";
import { Navigate } from "react-router-dom";

import { SideMenu } from "components/SideMenu";
import { CardMenu } from "components/CardMenu";
import { STORAGE_KEY } from "consts";
import { routes } from "routes";

type Props = {
  children: JSX.Element;
}

const PrivateRoute = ({
  children,
}: Props) => {

  if (!localStorage.getItem(STORAGE_KEY)) {
    return <Navigate to={routes.login} replace />;
  }

  return (
    <>
      <SideMenu/>
      <CardMenu/>
      {children}
    </>
  );
};

export { PrivateRoute }