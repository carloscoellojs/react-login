import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// using our component for building inputs
import { Input } from "../../common/Input/Input";
// using our label component for building our labels
import { Label } from "../../common/Label/Label";
// using our stateles component for building alert messages
import { AlertMessage } from "../../common/Alert/AlertMessage";
// connecting react with redux so they can communicate
import { useSelector, useDispatch } from "react-redux";
// using our registerUser method for dispatching action
import { cleanUpAction, registerUserAction } from "../../actions/userActions";
// using our common js object for accessing properties and methods
import common from "../../common/Common";

// sateful component that represents our register page
const Register = () => {
  const { register } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const isLoggedIn = common.isLoggedIn();
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    const { success, message } = register;
    if(message){
      afterHandleFormSubmit(success, message);
    }
  }, [register]);

  // updating state, redirecting
  const afterHandleFormSubmit = (success, message) => {
    if (success) {
      setSuccess(success);
      setMessage(message);
      setFetching(false);
      setTimeout(() => {
        setSuccess("");
        setMessage("");
        setFormErrors({ name: "", email: "", password: "" });
        dispatch(cleanUpAction('register'));
        navigate("/");
      }, 2000);
    } else {
      setSuccess(success);
      setMessage(message);
      setFetching(false);
      setTimeout(() => {
        setSuccess("");
        setMessage("");
        setFormErrors({ name: "", email: "", password: "" });
        dispatch(cleanUpAction('register'));
      }, 2000);
    }
  }

  // on a specific input change please verify and update form errors and state input value
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let regex = "";
    switch (name) {
      case "name":
        setName(value);
        const name = value.length < 5 ? "minimum 5 characters" : "";
        setFormErrors({ ...formErrors, name });
        break;
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
    dispatch(registerUserAction(name, email, password));
    setName("");
    setEmail("");
    setPassword("");
    setFetching(true);
  };

  // seek if email and password are not empty
  const noEmtpyInputsPlease = !name.length || !email.length || !password.length;
  // boolean that returns from verifying form validation
  const formValidation = validateForm(formErrors);
  // on register success show alert success message
  const successMessage = success && message && (
    <AlertMessage className="alert alert-success" message={message} />
  );
  // on regiser failure show alert error message
  const errorMessage = !success && message && (
    <AlertMessage className="alert alert-danger" message={message} />
  );
  return (
    <div className="container my-5">
      {successMessage || errorMessage}
      <form onSubmit={handleFormSubmit} className="needs-validation" noValidate>
        <div className="form-group">
          <Label name="name" />
          <Input
            type="text"
            className="form-control"
            name="name"
            onChange={handleInputChange}
            value={name}
            placeholder="name .."
          />
          {formErrors.name && (
            <div className="invalid-feedback" style={{ display: "block" }}>
              {formErrors.name}
            </div>
          )}
        </div>
        <div className="form-group">
          <Label name="email" />
          <Input
            type="email"
            className="form-control"
            name="email"
            onChange={handleInputChange}
            value={email}
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
            onChange={handleInputChange}
            value={password}
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
          value={fetching ? "Registering..." : "Register"}
          disabled={noEmtpyInputsPlease || formValidation ? true : false}
        />
      </form>
    </div>
  );
};

export default Register;
