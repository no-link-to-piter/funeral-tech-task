import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authReq } from "api";
import { STORAGE_KEY } from "consts";
import { getErrorText } from "helpers";
import { RequestStatus, requestStatuses } from "models";
import { AppDispatch, AppThunk } from "store";
import { resetStateToInitial } from "./utils";

interface AuthState {
    username: string | null;
    status: RequestStatus;
    error: string | null;
}

const initialState: AuthState = {
    username: null,
    status: requestStatuses.idle,
    error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: startLoading,
    authSuccess(state, action: PayloadAction<string>) {
      state.username = action.payload;
      state.status = requestStatuses.succeeded;
      state.error = null;
    },
    authFailure: loadingFailed,

    resetToDefaults(state) {
      resetStateToInitial(state, initialState);
    },
  }
});

const {
    authStart,
    authSuccess,
    authFailure
} = AuthSlice.actions;

export const { resetToDefaults } = AuthSlice.actions;

export const authUser = (username: string): AppThunk => async (
    dispatch: AppDispatch
) => {
  try {
    dispatch(authStart())
    const item = await authReq(username);
    const { headers } = item;
    const token = headers.get("Authorization");
    if (token) {
      dispatch(authSuccess(username))
      localStorage.setItem(STORAGE_KEY, token.replace("Bearer ", ""))
    }
  } catch (error: any) {
    dispatch(authFailure(getErrorText(error)));
  }
}

export default AuthSlice.reducer;

function startLoading(state: AuthState) {
  state.status = requestStatuses.loading;
}

function loadingFailed(state: AuthState, action: PayloadAction<string>) {
  state.status = requestStatuses.failed;
  state.error = action.payload;
}
