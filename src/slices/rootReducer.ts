import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import companySlice from "./companySlice";

const rootReducer = () =>
    combineReducers({
        company: companySlice,
        auth: authSlice
    });

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export { rootReducer };
