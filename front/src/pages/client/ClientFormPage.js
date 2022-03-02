import React, { useState, useEffect } from "react";

import { IMaskInput } from "react-imask";
import { viaCepService } from "../../services/via-cep";

import { isAdmin } from "../../helpers/is-admin";

//Formik
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

//Router
import { Link, useParams, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "../../store/actions/client-actions";

//Models
import { clientModel } from "../../models/client-model";

function ClientFormPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log("ID", id);
    if (id == undefined) {
      dispatch(clientActions.clearState());
    } else {
      dispatch(clientActions.findById(id));
    }
  }, []);

  const clients = useSelector((state) => state.clientState.clientItem);

  const mapStateToObject = () => {
    return clients.id ? clients : clientModel;
  };

  //Handlers
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);
    await dispatch(clientActions.save(values));
    navigate("/client");
  };

  const validationYupSchema = Yup.object({
    nome: Yup.string()
      .min(3, "Mínimo de 3 caracteres.")
      .max(100, "Máximo de 100 caracteres.")
      .required("Campo obrigatório.")
      .matches(/^[a-zA-Z0-9áéíóúàèìòùâêîôûãõÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕçÇ ]+$/, "Permitido apenas letras, espaços e números."),
    cpf: Yup.string().required("Campo obrigatório."),
    emailList: Yup.array().of(
      Yup.object().shape({
        email: Yup.string().required("Campo obrigatório.").email("Deve ser um e-mail válido."),
      })
    ),
    telefoneList: Yup.array().of(
      Yup.object().shape({
        numero: Yup.string().required("Campo obrigatório."),
      })
    ),
    endereco:
      // Yup.array().of(
      Yup.object().shape({
        cep: Yup.string().required("Campo obrigatório."),
        logradouro: Yup.string().required("Campo obrigatório."),
        bairro: Yup.string().required("Campo obrigatório."),
        cidade: Yup.string().required("Campo obrigatório."),
        uf: Yup.string().required("Campo obrigatório."),
      }),
  });

  return (
    <div>
      <h1>Formulário</h1>

      <Formik initialValues={mapStateToObject()} validationSchema={validationYupSchema} enableReinitialize={true} onSubmit={(values, { setSubmitting }) => handleSubmit(values, { setSubmitting })}>
        {({ values, handleSubmit, handleChange, handleBlur, isSubmitting, setFieldValue, setValues }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <label name="nome" htmlFor="nome" className="form-label">
                  Nome
                </label>
                <Field type="text" name="nome" className="form-control" disabled={!isAdmin()} />
                <ErrorMessage className="error-message" name="nome" component="div" />
              </div>

              <div className="col-12">
                <label htmlFor="cpf" className="form-label">
                  CPF
                </label>
                {/* <Field type="text" name="cpf" className="form-control" /> */}
                <Field
                  name="cpf"
                  render={({ field }) => (
                    <IMaskInput
                      {...field}
                      disabled={!isAdmin()}
                      mask={"000.000.000-00"}
                      placeholder="000.000.000-00"
                      className="form-control"
                      unmask={true}
                      onAccept={(value, mask) => {
                        setFieldValue("cpf", value);
                      }}
                    />
                  )}
                />
                <ErrorMessage className="error-message" name="cpf" component="div" />
              </div>

              <div className="col-12">
                <hr />
                <h4>E-mails</h4>
              </div>

              <FieldArray
                name="emailList"
                render={({ insert, remove, push }) => (
                  <div className=" col-12 ">
                    {values.emailList.length > 0 &&
                      values.emailList.map((email, index) => (
                        <div key={index} className="row align-items-end ">
                          <div className={values.emailList.length > 1 ? "col-11" : "col-12"}>
                            <label htmlFor={`emailList.${index}.email`} className="form-label">
                              Email
                            </label>
                            <Field name={`emailList.${index}.email`} placeholder="exemplo@email.com" type="email" className="form-control" disabled={!isAdmin()} />
                            <ErrorMessage className="error-message" name={`emailList.${index}.email`} component="div" />
                          </div>

                          {values.emailList.length > 1 && isAdmin() && (
                            <div className="col-1 align-bottom">
                              <button type="button" className="secondary form-control" onClick={() => remove(index)}>
                                X
                              </button>
                            </div>
                          )}
                        </div>
                      ))}

                    {isAdmin() && (
                      <div className="row mt-2">
                        <div className="col-3">
                          <button type="button" className="btn btn-primary " onClick={() => push({ id: undefined, email: "" })}>
                            Adicionar e-mail
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              />

              <div className="col-12">
                <hr />
                <h4>Telefones</h4>
              </div>

              <FieldArray
                name="telefoneList"
                render={({ insert, remove, push }) => (
                  <div className="col-12">
                    {values.telefoneList.length > 0 &&
                      values.telefoneList.map((telefone, index) => (
                        <div key={index} className="row align-items-end">
                          <div className="col-4">
                            <label className="form-label">Tipo</label>
                            <select name={`telefoneList.${index}.tipo`} value={values.color} onChange={handleChange} onBlur={handleBlur} className="form-select" disabled={!isAdmin()}>
                              <option value="CELULAR" label="Celular" />
                              <option value="COMERCIAL" label="Comercial" />
                              <option value="RESIDENCIAL" label="Residencial" />
                            </select>
                            <ErrorMessage className="error-message-white" name={`telefoneList.${index}.numero`} component="div" />
                          </div>

                          <div className={values.telefoneList.length > 1 ? "col-7" : "col-8"}>
                            <label htmlFor={`telefoneList.${index}.numero`} className="form-label">
                              Número
                            </label>

                            {values.telefoneList[index].tipo == "CELULAR" ? (
                              //   <Field type="text" name={`telefoneList.${index}.numero`} className="form-control" />
                              <Field
                                name={`telefoneList.${index}.numero`}
                                render={({ field }) => (
                                  <IMaskInput
                                    {...field}
                                    disabled={!isAdmin()}
                                    mask={"(00) 0 0000-0000"}
                                    placeholder="(00) 0 0000-0000"
                                    className="form-control"
                                    unmask={true}
                                    onAccept={(value, mask) => {
                                      setFieldValue(`telefoneList.${index}.numero`, value);
                                    }}
                                  />
                                )}
                              />
                            ) : (
                              //   <Field type="text" name={`telefoneList.${index}.numero`} className="form-control" />
                              <Field
                                name={`telefoneList.${index}.numero`}
                                render={({ field }) => (
                                  <IMaskInput
                                    {...field}
                                    disabled={!isAdmin()}
                                    mask={"(00) 0000-0000"}
                                    placeholder="(00) 0000-0000"
                                    className="form-control"
                                    unmask={true}
                                    onAccept={(value, mask) => {
                                      setFieldValue(`telefoneList.${index}.numero`, value);
                                    }}
                                  />
                                )}
                              />
                            )}
                            <ErrorMessage className="error-message" name={`telefoneList.${index}.numero`} component="div" />
                          </div>

                          {values.telefoneList.length > 1 && isAdmin() && (
                            <div className="col-1 align-bottom">
                              <button type="button" className="secondary form-control" onClick={() => remove(index)}>
                                {" "}
                                X{" "}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}

                    {isAdmin() && (
                      <div className="row mt-3">
                        <div className="col-3">
                          <button type="button" className="btn btn-primary " onClick={() => push({ id: undefined, tipo: "CELULAR", numero: "" })}>
                            Adicionar telefone
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              />

              <div className="col-12">
                <hr />
                <h4>Endereço</h4>
              </div>

              <div className="col-12">
                <div className="row">
                  <div className="col-4">
                    <label htmlFor="cep" className="form-label">
                      Cep
                    </label>
                    {/* <Field type="text" name="endereco.cep" className="form-control" /> */}
                    <Field
                      name={`endereco.cep`}
                      render={({ field }) => (
                        <IMaskInput
                          {...field}
                          disabled={!isAdmin()}
                          mask={"00.000-000"}
                          placeholder="00.000-000"
                          className="form-control"
                          unmask={true}
                          onAccept={(value, mask) => {
                            viaCepService.findCep(value).then((response) => {
                              setFieldValue("endereco.cep", value);
                              setFieldValue("endereco.logradouro", response.data.logradouro);
                              setFieldValue("endereco.bairro", response.data.bairro);
                              setFieldValue("endereco.cidade", response.data.localidade);
                              setFieldValue("endereco.uf", response.data.uf);
                              setFieldValue("endereco.complemento", response.data.complemento);
                            });
                          }}
                        />
                      )}
                    />

                    <ErrorMessage className="error-message" name="endereco.cep" component="div" />
                  </div>

                  <div className="col-8">
                    <label htmlFor="complemento" className="form-label">
                      Complemento
                    </label>
                    <Field type="text" name="endereco.complemento" className="form-control" disabled={!isAdmin()} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <label htmlFor="logradouro" className="form-label">
                      Logradouro
                    </label>
                    <Field type="text" name="endereco.logradouro" className="form-control" disabled={!isAdmin()} />
                    <ErrorMessage className="error-message" name="endereco.logradouro" component="div" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <label htmlFor="bairro" className="form-label">
                      Bairro
                    </label>
                    <Field type="text" name="endereco.bairro" className="form-control" disabled={!isAdmin()} />
                    <ErrorMessage className="error-message" name="endereco.bairro" component="div" />
                  </div>

                  <div className="col-4">
                    <label htmlFor="cidade" className="form-label">
                      Cidade
                    </label>
                    <Field type="text" name="endereco.cidade" className="form-control" disabled={!isAdmin()} />
                    <ErrorMessage className="error-message" name="endereco.cidade" component="div" />
                  </div>

                  <div className="col-4">
                    <label htmlFor="uf" className="form-label">
                      Estado
                    </label>
                    <Field type="text" name="endereco.uf" className="form-control" disabled={!isAdmin()} />
                    <ErrorMessage className="error-message" name="endereco.uf" component="div" />
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                {isAdmin() && (
                  <div className="col-1 ">
                    <button type="submit" className="btn btn-primary " disabled={isSubmitting}>
                      Salvar
                    </button>
                  </div>
                )}
                <div className="col-1 ">
                  <Link to={`/client`} className="btn btn-danger">
                    Cancelar
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { ClientFormPage };
