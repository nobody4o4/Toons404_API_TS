import { object, string } from "yup";


const RegisterValidator = object({
  body: object({
    firstName: string()
      .trim()
      .required("First name is required.")
      .min(2, "First name must be at least 2 characters.")
      .max(30, "First name must be at most 30 characters."),
    lastName: string()
      .trim()
      .required("Last name is required.")
      .min(2, "Last name must be at least 2 characters.")
      .max(30, "Last name must be at most 30 characters."),
    username: string()
      .trim()
      .required("Username is required.")
      .min(4, "Username must be at least 4 characters.")
      .max(20, "Username must be at most 20 characters.")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores."
      ),
    email: string()
      .trim()
      .email("Invalid email format.")
      .required("Email is required.")
      .max(100, "Email must be at most 100 characters."),
    password: string().required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(30, "Password must be at most 30 characters.")
    .matches(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter."
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter."
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one number.")
    .matches(
      /^(?=.*[@$!%*?&])/,
      "Password must contain at least one special character."
    ),
  }),
});

export default RegisterValidator;
