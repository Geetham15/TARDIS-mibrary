import React, { useContext, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import TextError from "./TextError";
import * as Yup from "yup";
import "./LoginForm.css";
import AuthenticationContext from "../../AuthenticationContext";

function LoginForm() {

  const initialValues = {
    email: "",
    password: "",
  };
  const [loginError, setLoginError] = useState('')
  const authContext = useContext(AuthenticationContext)
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    let response = await fetch("/api/logIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    response = await response.json();
    console.log(`${response.userId} - ${response.username} is logged in user`)

    if (response.message === 'success'){

      authContext.logIn(response.username, response.userId)
      window.sessionStorage.setItem('user_id', response.userId)
      window.sessionStorage.setItem('username',response.username)
      setLoginError('')
      navigate('/addBooks')
    }else{
      setLoginError('Login Failed!')
    }
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
          <button type="submit" className="btn btn-block">
            <h1>Log in</h1>
          </button>
          <p>Don't have an account?</p>
          <NavLink exact to="/signup">
            <button type="button" className="btn btn-block">
              <h1>Sign up</h1>
            </button>
          </NavLink>
        </div>
      </Form>
    </Formik>
  );
}

export default LoginForm;
