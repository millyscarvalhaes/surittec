import React, { useState, useEffect } from "react";

//Router
import { Link, useLocation } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions/user-actions";

//Formik
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

function LoginPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = ({ username, password }, { setSubmitting }) => {
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(userActions.login({ username: username, password: password }, from));
    }
  };

  const values = { username: "", password: "" };

  const validationYupSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Login</h2>

      <Formik initialValues={values} validationSchema={validationYupSchema} enableReinitialize onSubmit={(values, { setSubmitting }) => handleSubmit(values, { setSubmitting })}>
        {({ values, errors, handleSubmit, handleChange, isSubmitting, setFieldValue, setValues }) => (
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Usuário</label>
              <Field type="text" name="username" className={`form-control ${errors.username ? "is-invalid" : ""}`} />
              <ErrorMessage className="is-invalid" name="username" component="div" />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <Field type="password" name="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} />
              <ErrorMessage className="is-invalid" name="password" component="div" />
            </div>

            <div className="form-group">
              <button className="btn btn-primary">Login</button>
              <Link to="/register" className="btn btn-link">
                Register
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { LoginPage };
