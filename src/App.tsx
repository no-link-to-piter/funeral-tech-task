import React, { useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";
import { useDispatch } from 'react-redux';

import { MainPage } from 'pages/MainPage';
import { routes } from 'routes';
import { CompanyPage } from 'pages/CompanyPage';
import { PrivateRoute } from 'components/common/PrivateRoute';
import { LoginPage } from 'pages/LoginPage';
import { LogoutPage } from 'pages/LogoutPage';
import { ConfirmPopup } from 'components/ConfirmPopup';
import { ConfirmContext, OverlayContext } from 'context';
import { AppDispatch } from 'store';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { deleteCompany } from 'slices/companySlice';

const App = () => { 

  const dispatch: AppDispatch = useDispatch();

  const confirmRef = useRef<HTMLDivElement | null>(null);

  const [confirmCompanyId, setConfirmCompanyId] = useState<string>("");
  const [isOverlay, setIsOverlay] = useState<boolean>(false);

  const handleCloseConfirm = () => {
    setConfirmCompanyId("");
    setIsOverlay(false);
  }

  useOnClickOutside(confirmRef, handleCloseConfirm)

  return (
    <div className="app">
      <CSSTransition 
        timeout={200}
        in={isOverlay}
        classNames={{
          enter: 'overlay enter',
          enterDone: 'overlay enter-done',
          exit: 'overlay exit',
          exitDone: 'overlay exit-done',
        }}
        unmountOnExit
        >
          <div/>
      </CSSTransition>
      <CSSTransition
        in={!!confirmCompanyId}
        timeout={200}
        classNames={{
          enter: 'confirm-popup enter',
          enterDone: 'confirm-popup enter-done',
          exit: 'confirm-popup exit',
          exitDone: 'confirm-popup exit-done',
        }}
        unmountOnExit
        >
          <div 
            className="confirm-popup"
            ref={confirmRef}>
            <ConfirmPopup
              handleReject={handleCloseConfirm}
              handleAccept={() => {
                if (confirmCompanyId) {
                  dispatch(deleteCompany(Number(confirmCompanyId), handleCloseConfirm))
                }
              }}/>
          </div>
      </CSSTransition>
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.login}
          element={<LoginPage/>}/>
        <Route
          path={routes.logout}
          element={<LogoutPage/>}/>
        <Route
          path={routes.home}
          element={
            <PrivateRoute>
              <OverlayContext.Provider value={{isOverlay, setIsOverlay}}>
                <ConfirmContext.Provider value={{confirmCompanyId, setConfirmCompanyId}}>
                  <MainPage/>
                </ConfirmContext.Provider>
              </OverlayContext.Provider>
            </PrivateRoute>
          }/>
        <Route
          path={routes.company()}
          element={
            <PrivateRoute>
              <OverlayContext.Provider value={{isOverlay, setIsOverlay}}>
                <ConfirmContext.Provider value={{confirmCompanyId, setConfirmCompanyId}}>
                  <CompanyPage/>
                </ConfirmContext.Provider>
              </OverlayContext.Provider>
            </PrivateRoute>
          }/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export { App };