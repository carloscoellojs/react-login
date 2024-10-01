import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Blog from "./components/Blog/Blog";
import common from "./common/Common";
import store from "./reducers/store";
import { Provider } from "react-redux";

if (localStorage.getItem("token")) {
  common.authenticateWithHeaders(localStorage.getItem("token"));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/blog" Component={Blog} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
