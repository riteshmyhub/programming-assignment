import { configureStore } from "@reduxjs/toolkit";
import toastMiddleware from "./middleware/toast.middleware";
import { authReducer } from "./services/auth.service";
import { Provider, useDispatch, useSelector } from "react-redux";
import { accountReducer } from "./services/account.service";

export const store = configureStore({
   reducer: {
      authReducer: authReducer,
      accountReducer: accountReducer,
   },
   middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(toastMiddleware);
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

/*----------------------ReduxProvider-----------------*/
type Props = {
   children?: Readonly<React.ReactNode>;
};
const ReduxProvider = ({ children }: Props) => <Provider store={store}>{children}</Provider>;

export default ReduxProvider;
