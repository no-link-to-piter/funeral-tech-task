import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { routes } from "routes";
import { useDispatch } from "react-redux";
import { resetToDefaults as resetCompanySlice } from "slices/companySlice";
import { resetToDefaults as resetAuthSlice } from "slices/authSlice";
import { AppDispatch } from "store";

const LogoutPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(resetAuthSlice());
    dispatch(resetCompanySlice());
    localStorage.clear();
  });
  return <Navigate to={routes.login} />;
};

export { LogoutPage };
