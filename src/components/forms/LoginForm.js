import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import TextError from "./TextError";
import * as Yup from "yup";
import "./LoginForm.css";
function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    let response = await fetch("/api/logIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    response = await response.json();
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("invalid email format")
      .required("Please enter a valid email address"),
    password: Yup.string().required(
      "Please enter a password between 5 and 15 characters"
    ),
  });

  console.log("Form Data", initialValues);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="flex flex-col justify-center items-center ">
        <div className="text-center text-2xl">
          <h1>Login</h1>
        </div>
        <div className="">
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component={TextError} />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <Field
            type="password"
            id="password"
            name="password"
            minLength="3"
            maxLength="15"
          />
          <ErrorMessage name="password" component={TextError} />
          <NavLink exact to="/forgotpassword">
            <Field as="button" className="float-right">
              <h3>Forgot Password?</h3>
            </Field>
          </NavLink>
        </div>
        <div>
          <Field as="button" type="submit" value="Login" />
          <button
            type="submit"
            className="bg-blue-500 rounded  m-10 w-full flex flex-col justify-center items-center "
          >
            <h1>Sign In</h1>
          </button>

          <NavLink exact to="/signup">
            <button
              type="button"
              className="bg-blue-500 rounded w-full  m-10 flex flex-col justify-center items-center"
            >
              <h1>Get Started</h1>
            </button>
          </NavLink>
        </div>
      </Form>
    </Formik>
  );
}

export default LoginForm;
