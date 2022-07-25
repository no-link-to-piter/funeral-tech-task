import React from "react";

type OverlayContextType = {
    isOverlay: boolean,
    setIsOverlay: (value: boolean) => void
}

const OverlayContext = React.createContext<OverlayContextType>({
    isOverlay: false,
    setIsOverlay: () => {}
});

type ConfirmContextType = {
    confirmCompanyId: string,
    setConfirmCompanyId: (value: string) => void
}

const ConfirmContext = React.createContext<ConfirmContextType>({
    confirmCompanyId: "",
    setConfirmCompanyId: () => {}
});

export { ConfirmContext, OverlayContext };