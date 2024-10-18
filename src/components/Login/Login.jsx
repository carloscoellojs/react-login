import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// using our component for building inputs
import { Input } from "../Input/Input";
// using our label component for building our labels
import { Label } from "../Label/Label";
// importing loginUserAction action for dispatching it on the component
import {
  cleanUpAction,
  loginUserAction
} from "../../actions/userActions";
// using our alert message component for displaying messages
import { AlertMessage } from "../Alert/AlertMessage";
// using our common js object for using properties methods
import common from "../../lib/common";
import { Form } from "../Form/Form";
import {
  INITIAL_LOGIN_FORM_ERRORS_STATE,
  INITIAL_LOGIN_FORM_STATE,
  INPUT_EMAIL_ERROR_MESSAGE,
  INPUT_PASSWORD_ERROR_MESSAGE,
  REGEX_VALID_EMAIL,
  REGEX_VALID_PASSWORD
} from "../../lib/constants";
import { PageHeader } from "../PageHeader/PageHeader";
import { selectAll } from "../../lib/selectors";

// component representing login page
const Login = () => {
  const [loginForm, setLoginForm] = useState(INITIAL_LOGIN_FORM_STATE);
  const [loginFormErrors, setLoginFormErrors] = useState(
    INITIAL_LOGIN_FORM_ERRORS_STATE
  );
  const [fetching, setFetching] = useState(false);
  const { login } = useSelector(selectAll);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // lifecylce method typically used to make requests and setState
  useEffect(() => {
    const isLoggedIn = common.isLoggedIn();
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  useEffect(() => {
    const { status } = login;
    if(status === 200){
      loginSuccessful()
    }
  }, [login.status]);

  const loginSuccessful = () => {
    setTimeout(() => {
      setLoginForm(INITIAL_LOGIN_FORM_STATE);
      setLoginFormErrors(INITIAL_LOGIN_FORM_ERRORS_STATE);
      navigate("/dashboard", { replace: true });
    }, 2000)
  };

  // on a specific input change please verify and update form errors and state input value
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        let emailError =
          value.length && !REGEX_VALID_EMAIL.test(value)
            ? INPUT_EMAIL_ERROR_MESSAGE
            : "";
        setLoginForm({ ...loginForm, [name]: value });
        setLoginFormErrors({ ...loginFormErrors, emailError });
        break;
      case "password":
        let passwordError =
          value.length && !REGEX_VALID_PASSWORD.test(value)
            ? INPUT_PASSWORD_ERROR_MESSAGE
            : "";
        setLoginForm({ ...loginForm, [name]: value });
        setLoginFormErrors({ ...loginFormErrors, passwordError });
        break;
      default:
        break;
    }
  };

  // this method submits the form input values to the redux action method fetchUser
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginForm;
    dispatch(loginUserAction(email, password));
    setFetching(true);
    setTimeout(() => {
      dispatch(cleanUpAction());
      setFetching(false);
    }, 2000);
  };

  return (
    <div className="container my-5">
      <PageHeader>
         <h2>Login Page</h2>
      </PageHeader>
      <AlertMessage success={login.success} message={login.message} showAlert={fetching} />
      <Form onSubmit={handleFormSubmit}>
        <div className="form-group my-3">
          <Label name="email" />
          <Input
            type="email"
            className="form-control"
            name="email"
            value={loginForm.email}
            errorMessage={loginFormErrors.emailError}
            onChange={handleInputChange}
            placeholder="email .."
          />
        </div>
        <div className="form-group my-3">
          <Label name="password" />
          <Input
            type="password"
            className="form-control"
            name="password"
            value={loginForm.password}
            errorMessage={loginFormErrors.passwordError}
            onChange={handleInputChange}
            placeholder="password .."
          />
        </div>
        <div className="form-group my-3">
        <Input
          type="submit"
          className="btn btn-primary"
          value={fetching ? "Authenticating..." : "Login"}
          disabled={common.disableSubmitButton(
            loginForm,
            loginFormErrors,
            fetching
          )}
        />
        </div>
      </Form>
    </div>
  );
};

export default Login;
