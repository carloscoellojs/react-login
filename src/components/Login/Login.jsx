import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// using our component for building inputs
import { Input } from "../../common/Input/Input";
// using our label component for building our labels
import { Label } from "../../common/Label/Label";
// importing loginUserAction action for dispatching it on the component
import { cleanUpAction, fetchUserAction, loginUserAction } from "../../actions/userActions";
// using our alert message component for displaying messages
import { AlertMessage } from "../../common/Alert/AlertMessage";
// using our common js object for using properties methods
import common from "../../common/Common";
import { useDispatch, useSelector } from "react-redux";

// component representing login page
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);
  const { user, login } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // lifecylce method typically used to make requests and setState
  useEffect(() => {
    const isLoggedIn = common.isLoggedIn();
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  // everytime props change run this lifecycle method
  useEffect(() => {
    const { success, message } = login;
    if(message){
    afterHandleFormSubmit(success, message);
  }
  }, [login]);

  // updating state, redirecting
  const afterHandleFormSubmit = (success, message) => {
    if (success) {
      setEmail("");
      setPassword("");
      setSuccess(success);
      setMessage(message);
      setFetching(false);
      setTimeout(() => {
        setSuccess("");
        setMessage("");
        setFormErrors({ email: "", password: "" });
        dispatch(fetchUserAction(localStorage.getItem("id")));
        navigate("/dashboard");
      }, 2000);
    } else {
      setSuccess(success);
      setMessage(message);
      setFetching(false);
      setTimeout(() => {
        setSuccess("");
        setMessage("");
        setFormErrors({ email: "", password: "" });
        dispatch(cleanUpAction('login'));
      }, 2000);
    }
  }

  // on a specific input change please verify and update form errors and state input value
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let regex = "";
    switch (name) {
      case "email":
        setEmail(value);
        regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/gi;
        const email =
          value.length && !regex.test(value)
            ? "email must have following format example: john@example.com"
            : "";
        setFormErrors({ ...formErrors, email });
        break;
      case "password":
        setPassword(value);
        regex = /.{6,}/gi;
        const password =
          value.length && !regex.test(value)
            ? "password must have at least 6 characters short"
            : "";
        setFormErrors({ ...formErrors, password });
        break;
      default:
        break;
    }
    // this.setState({ formErrors, [name]: value });
  };

  // this method verifies that the form has no errors
  const validateForm = (formErrors) => {
    let valid = true;
    Object.values(formErrors).forEach((v) => {
      valid = v.length ? true : false;
    });
    return valid;
  };

  // this method submits the form input values to the redux action method fetchUser
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(email, password));
    setFetching(true);
  };

  // seek if email and password are not empty
  const noEmtpyInputsPlease = !email.length || !password.length;
  // get boolean from validateForm
  const formValidation = validateForm(formErrors);
  const successMessage = success && message && (
    <AlertMessage className="alert alert-success" message={message} />
  );

  const errorMessage = !success && message && (
    <AlertMessage className="alert alert-danger" message={message} />
  );

  return (
    <div className="container my-5">
      {successMessage || errorMessage}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <Label name="email" />
          <Input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="email .."
          />
          {formErrors.email && (
            <div className="invalid-feedback" style={{ display: "block" }}>
              {formErrors.email}
            </div>
          )}
        </div>
        <div className="form-group">
          <Label name="password" />
          <Input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="password .."
          />
          {formErrors.password && (
            <div className="invalid-feedback" style={{ display: "block" }}>
              {formErrors.password}
            </div>
          )}
        </div>
        <Input
          type="submit"
          className="btn btn-primary"
          value={fetching ? "Authenticating..." : "Login"}
          disabled={noEmtpyInputsPlease || formValidation ? true : false}
        />
      </form>
    </div>
  );
};

export default Login;
