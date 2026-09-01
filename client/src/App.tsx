// App.tsx
import { Route, Routes, Navigate, Outlet, } from "react-router-dom";
import { Dashboard, Landing, Login, Profile, Register, transactions } from "./pages";
const { Transactions, CreateTransaction } = transactions
import { useEffect, type ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { loadUserByToken } from "./store/reducers/userReducer";
import Logout from "./pages/auth/Logout";

import AppLayout from "./components/layout/AppLayout";
import CreateBulkTransaction from "./pages/transactions/CreateBulkTransaction";
import Preview from "./pages/preview/Preview";


type Props = {
  authenticationRequired: boolean;
  children: ReactElement;
};

function AuthMiddleware({ children, authenticationRequired }: Props) {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (authenticationRequired && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!authenticationRequired && isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(loadUserByToken(token));
    }
  }, [dispatch, token]);



  return (
    <Routes>

      <Route index element={<Landing />} />

      <Route
        path="/dashboard"
        element={<AuthMiddleware authenticationRequired={true}><Dashboard /></AuthMiddleware>}
      />
      <Route
        path="/profile"
        element={<AuthMiddleware authenticationRequired={true}><Profile /></AuthMiddleware>}
      />
      <Route
        path="/transactions"
        element={<AuthMiddleware authenticationRequired={true}><AppLayout><Outlet /></AppLayout></AuthMiddleware>}
      >
        <Route index element={<Transactions />} />
        <Route path="new" element={<CreateTransaction />} />
        <Route path="new/bulk" element={<CreateBulkTransaction />} />
      </Route>

      <Route
        path="/logout"
        element={<AuthMiddleware authenticationRequired={true}><Logout /></AuthMiddleware>}
      />
      <Route
        path="/login"
        element={<AuthMiddleware authenticationRequired={false}><Login /></AuthMiddleware>}
      />
      <Route
        path="/preview"
        element={<Preview />}
      />
      <Route
        path="/register"
        element={<AuthMiddleware authenticationRequired={false}><Register /></AuthMiddleware>}
      />

      {/* <Route path="/test" element={<Test />} /> */}

    </Routes>
  );
}
