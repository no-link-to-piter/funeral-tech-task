import {
  configureStore,
  getDefaultMiddleware,
  Action,
  Middleware,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { RootState, rootReducer } from "slices/rootReducer";
  
const handleHttpErrors: Middleware<{}, RootState> = () => (next) => (
  action
) => {
  return next(action); // TODO: handle 401 error
};

const store = configureStore({
  reducer: rootReducer(),
  middleware: [
    handleHttpErrors, 
    // logger,
    ...getDefaultMiddleware(),
  ],
});

export type AppDispatch = ThunkDispatch<RootState, null, Action<string>>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export { store };
