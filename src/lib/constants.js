export const INITIAL_LOGIN_FORM_STATE = {
  email: "",
  password: ""
};

export const INITIAL_LOGIN_FORM_ERRORS_STATE = {
  emailError: "",
  passwordError: ""
};

export const INITIAL_REGISTER_FORM_STATE = {
  name: "",
  email: "",
  password: ""
};

export const INITIAL_REGISTER_FORM_ERRORS_STATE = {
  nameError: "",
  emailError: "",
  passwordError: ""
};


export const INPUT_NAME_ERROR_MESSAGE = "minimum 5 characters";

export const REGEX_VALID_EMAIL = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

export const INPUT_EMAIL_ERROR_MESSAGE = "email must have following format example: john@example.com";

export const REGEX_VALID_PASSWORD =  /.{6,}/;

export const INPUT_PASSWORD_ERROR_MESSAGE = "password must have at least 6 characters short";
