// App.tsx
import { useEffect, type ReactElement } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { loadUserByToken } from "./store/reducers/userReducer";
import AppLayout from "./components/layout/AppLayout";
import Parties from "./pages/party/Parties";
import CreateParty from "./pages/party/CreateParty";
import UpdateParty from "./pages/party/UpdateParty";
import Party from "./pages/party/Party";
import { Dashboard, Landing, Login, Profile, Register, } from "./pages";
import CreateTransaction from "./pages/transactions/CreateTransaction";
import CreateBulkTransaction from "./pages/transactions/CreateBulkTransaction";
import Logout from "./pages/auth/Logout";
import Preview from "./pages/preview/Preview";
import Transactions from "./pages/transactions/Transactions";


function RequireAuth({ children }: { children: ReactElement }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function RequireGuest({ children }: { children: ReactElement }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) dispatch(loadUserByToken(token));
  }, [dispatch, token]);

  console.log(import.meta.env.VITE_API_BASE_URL)
  return (
    <Routes>
      <Route index element={<Landing />} />

      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <AppLayout>
              <Outlet />
            </AppLayout>
          </RequireAuth>
        }
      >

        <Route path="transactions">
          <Route index element={<Transactions />} />
          <Route path="new" element={<CreateTransaction />} />
          <Route path="new/bulk" element={<CreateBulkTransaction />} />
        </Route>

        <Route path="parties">
          <Route index element={<Parties />} />
          <Route path=":id" element={<Party />} />
          <Route path="new" element={<CreateParty />} />
          <Route path="update/:id" element={<UpdateParty />} />
        </Route>

        <Route path="accounts" element={<></>} />
        <Route path="receivables" element={<></>} />
        <Route path="payables" element={<></>} />
        <Route path="reports" element={<></>} />
        <Route path="settings" element={<></>} />

      </Route>


      <Route path="/logout" element={<RequireAuth><Logout /></RequireAuth>} />
      <Route path="/login" element={<RequireGuest><Login /></RequireGuest>} />
      <Route path="/register" element={<RequireGuest><Register /></RequireGuest>} />

      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
}