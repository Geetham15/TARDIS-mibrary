import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
function SignUp() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  };

  const onSubmit = (values) => {};

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("invalid email format")
      .required("Please enter a valid email address"),
    password: Yup.string().required(
      "Please enter a password between 5 and 15 characters"
    ),
    confirmPass: Yup.string().required("password does not match"),
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
          <h1>Sign Up</h1>
        </div>
        <div className="">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component={TextError} />
        </div>
        <div className="">
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component={TextError} />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component={TextError} />
        </div>
        <div className="">
          <label htmlFor="confirmPass"> Confirm Password</label>
          <Field type="password" id="confirmPass" name="confirmPass" />
          <ErrorMessage name="confirmPass" component={TextError} />
        </div>
        <div className="text-sm">
          <p>Your personal data will be used to support your experience</p>{" "}
          <p>throughout this website, to manage access to your account, and</p>{" "}
          <p>for other purposes described in our</p>
          <NavLink exact to="/privacypolicy">
            <Field as="button">
              <strong className="text-red-600">privacy policy.</strong>
            </Field>
          </NavLink>
        </div>

        <div>
          <Field as="button" type="submit" value="Sign Up" />
          <button
            type="button"
            className="bg-blue-500 rounded  flex flex-col justify-center items-center w-full my-5 px-20 float-right "
          >
            <h1>Sign In</h1>
          </button>
        </div>
        <div>
          <p className="float-left">Already have an account?</p>
          <Field as="button">
            <NavLink exact to="/login" className="bg-blue-500 rounded">
              Login
            </NavLink>
          </Field>
        </div>
      </Form>
    </Formik>
  );
}

export default SignUp;
