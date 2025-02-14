import { useContext } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Business } from "./components/Auth/Business/Business";
import { ConnectAccount } from "./components/Auth/ConnectAccount/ConnectAccount";
import { Login } from "./components/Auth/Login/Login";
import { Register } from "./components/Auth/Register/Register";
import { VerifyEmail } from "./components/Auth/VerifyEmail/VerifyEmail";
import { YourData } from "./components/Auth/YourData/YourData";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { NavBar } from "./components/NavBar/NavBar";
import { Plans } from "./components/Plans/Plans";
import { AuthContext } from "./context/AuthContext";
import { MercadoPago } from "./components/Accounts/MercadoPago/MercadoPago";
import { Header } from "./components/Header/Header";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.steps < 5) {
    return <Navigate to={"/register"} />
  }

  return (
    <main>
      <NavBar />
      <section>
        <Header />
        {children}
      </section>
    </main>
  );
};

const AuthRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    switch (user.steps) {
      case 1:
        return <Navigate to="/register/verify-email/" />;
      case 2:
        return <Navigate to="/register/business" />;
      case 3:
        return <Navigate to="/register/connect-account" />;
      case 4:
        return <Navigate to="/register/plans" />;
      case 5:
        return window.history.back();
      default:
        return <Navigate to="/dashboard" />;
    }
  }

  return children;
};

const router = createBrowserRouter([
  { path: "/login", element: <AuthRoute><Login /></AuthRoute> },
  {
    path: "/register", element: <Register />,
    children: [
      { path: "", element: <YourData /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "business", element: <Business /> },
      { path: "connect-account", element: <ConnectAccount /> },
      { path: "plans", element: <Plans /> },
    ]
  },
  { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
  { path: "/clients", element: <ProtectedRoute>clientes</ProtectedRoute> },
  { path: "/services", element: <ProtectedRoute>servicios</ProtectedRoute> },
  { path: "/reminders", element: <ProtectedRoute>recordatorios</ProtectedRoute> },
  { path: "/mercado-pago", element: <ProtectedRoute><MercadoPago /></ProtectedRoute> },
  { path: "*", element: <Navigate to="/dashboard" /> }
]);

export function App() {
  return (
    <RouterProvider router={router} />
  )
}
