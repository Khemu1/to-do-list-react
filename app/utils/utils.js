import { object, string } from "yup";
import path from "path";
import fs from "fs";

// https://stackoverflow.com/questions/73425133/transform-yup-validation-error-into-a-useable-object
/**
 * Transforms Yup errors into an object.
 * @param {ValidationError} errors - The Yup validation errors.
 * @returns {Record<string, string>} - An object containing the error messages.
 */
export const transformYupErrorsIntoObject = (errors) => {
  const validationErrors = {};

  errors.inner.forEach((error) => {
    if (error.path !== undefined) {
      validationErrors[error.path] = error.errors[0];
    }
  });

  return validationErrors;
};

export const validateUserSchema = object({
  email: string()
    .email("Please enter a valid email")
    .required("No Email provided")
    .label("Email"),
  username: string()
    .required("No user Name provided")
    .label("Username")
    .min(5, "Username is too short , it should be 5 chars  minimum"),
  password: string()
    .required("No passwrod provieded")
    .label("Password")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "Password should only contain Latin letters and Numbers."
    ),
});
export const validateLoginSchema = object({
  email: string()
    .email("Please enter a valid email")
    .required("No Email provided")
    .label("email"),
  password: string().required("No passwrod provieded").label("password"),
});
