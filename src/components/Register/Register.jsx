import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// using our component for building inputs
import { Input } from "../Input/Input";
// using our label component for building our labels
import { Label } from "../Label/Label";
// using our stateles component for building alert messages
import { AlertMessage } from "../Alert/AlertMessage";
// connecting react with redux so they can communicate
import { useSelector, useDispatch } from "react-redux";
// using our registerUser method for dispatching action
import { cleanUpAction, registerUserAction } from "../../actions/userActions";
// using our common js object for accessing properties and methods
import common from "../../lib/common";
import {
  INITIAL_REGISTER_FORM_ERRORS_STATE,
  INITIAL_REGISTER_FORM_STATE,
  INPUT_EMAIL_ERROR_MESSAGE,
  INPUT_NAME_ERROR_MESSAGE,
  INPUT_PASSWORD_ERROR_MESSAGE,
  REGEX_VALID_EMAIL,
  REGEX_VALID_PASSWORD
} from "../../lib/constants";
import { Form } from "../Form/Form";
import { PageHeader } from "../PageHeader/PageHeader";
import { selectRegister } from "../../lib/selectors";

// component that represents our register page
const Register = () => {
  const register = useSelector(selectRegister);
  const [registerForm, setRegisterForm] = useState(INITIAL_REGISTER_FORM_STATE);
  const [registerFormErrors, setRegisterFormErrors] = useState(INITIAL_REGISTER_FORM_ERRORS_STATE);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const isLoggedIn = common.isLoggedIn();
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  useEffect(() => {
    const { status } = register;
    if (status === 201) {
      registrationSuccess();
    }
  }, [register.status]);

  // updating state, redirecting
  const registrationSuccess = () => {
    setTimeout(() => {
      setRegisterForm(INITIAL_REGISTER_FORM_STATE);
      setRegisterFormErrors(INITIAL_REGISTER_FORM_ERRORS_STATE);
      navigate("/");
    }, 2000)
  };

  // on a specific input change please verify and update form errors and state input value
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        let nameError = value.length && value.length < 5 ? INPUT_NAME_ERROR_MESSAGE : "";
        setRegisterForm({ ...registerForm, [name]: value });
        setRegisterFormErrors({ ...registerFormErrors, nameError });
        break;
      case "email":
        let emailError =
          value.length && !REGEX_VALID_EMAIL.test(value)
            ? INPUT_EMAIL_ERROR_MESSAGE
            : "";
        setRegisterForm({ ...registerForm, [name]: value });
        setRegisterFormErrors({ ...registerFormErrors, emailError });
        break;
      case "password":
        let passwordError =
          value.length && !REGEX_VALID_PASSWORD.test(value)
            ? INPUT_PASSWORD_ERROR_MESSAGE
            : "";
        setRegisterForm({ ...registerForm, [name]: value });
        setRegisterFormErrors({ ...registerFormErrors, passwordError });
        break;
      default:
        break;
    }
  };

  // this method submits the form input values to the redux action method fetchUser
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = registerForm;
    dispatch(registerUserAction(name, email, password));
    setFetching(true);
    setTimeout(() => {
      dispatch(cleanUpAction());
      setFetching(false);
    },2000)
  };

  return (
    <div className="container my-5">
       <PageHeader>
         <h2>Register Page</h2>
      </PageHeader>
      <AlertMessage success={register.success} message={register.message} showAlert={fetching} />
      <Form className="needs-validation" onSubmit={handleFormSubmit}>
        <div className="form-group my-3">
          <Label name="name" />
          <Input
            type="text"
            className="form-control"
            name="name"
            onChange={handleInputChange}
            errorMessage={registerFormErrors.nameError}
            value={registerForm.name}
            placeholder="name .."
          />
        </div>
        <div className="form-group my-3">
          <Label name="email" />
          <Input
            type="email"
            className="form-control"
            name="email"
            onChange={handleInputChange}
            errorMessage={registerFormErrors.emailError}
            value={registerForm.email}
            placeholder="email .."
          />
        </div>
        <div className="form-group my-3">
          <Label name="password" />
          <Input
            type="password"
            className="form-control"
            name="password"
            onChange={handleInputChange}
            errorMessage={registerFormErrors.passwordError}
            value={register.password}
            placeholder="password .."
          />
        </div>
        <div className="form-group my-3">
        <Input
          type="submit"
          className="btn btn-primary"
          value={fetching ? "Registering..." : "Register"}
          disabled={common.disableSubmitButton(registerForm, registerFormErrors, fetching)}
        />
        </div>
      </Form>
    </div>
  );
};

export default Register;
