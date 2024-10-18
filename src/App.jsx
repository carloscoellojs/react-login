import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Blog from "./components/Blog/Blog";
import common from "./lib/common";
import { store, persistor } from "./reducers/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";

if (localStorage.getItem("token")) {
  common.authenticateWithHeaders(localStorage.getItem("token"));
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "/blog",
        element: (
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        )
      },
    ]
  },
  {
    path: "/*",
    element: <PageNotFound />
  }
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
