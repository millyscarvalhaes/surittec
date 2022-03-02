import React, { useState, useEffect } from "react";

import { isAdmin } from "../../helpers/is-admin";

//Style
import { Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

//Router
import { Link, useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { clientActions } from "../../store/actions/client-actions";

function ClientListPage(props) {
  //Redux
  const dispatch = useDispatch();

  //Hooks
  useEffect(() => {
    dispatch(clientActions.list());
  }, []);

  const clients = useSelector((state) => state.clientState.clientList);

  //Modal
  const [clientItemState, setClientItemState] = useState({});
  const [modalShowState, setModalShowState] = useState(false);

  const handleModalShow = (client) => {
    setClientItemState(client);
    setModalShowState(true);
  };
  const handleCloseModal = () => {
    setClientItemState({});
    setModalShowState(false);
  };

  //Handlers
  const handleClientDelete = () => {
    dispatch(clientActions.deleteById(clientItemState.id));
    setModalShowState(false);
  };

  return (
    <div className="page-mh">
      <h1>Lista de Clientes</h1>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Last Name</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => {
            return (
              <tr key={index}>
                <td>{client.id}</td>
                <td>{client.nome}</td>
                <td>{client.cpf}</td>
                <td>
                  <Link to={`/client/form/${client.id}`} className="btn btn-outline-light mrl-10">
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Link>
                  {isAdmin() && (
                    <Button variant="outline-light" onClick={() => handleModalShow(client)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {isAdmin() && (
        <div className="col-sm text-align-left mrl-0 pl-0">
          <Link to={`/client/form`} className="btn btn-primary">
            Novo Cliente
          </Link>
        </div>
      )}

      <Modal show={modalShowState} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deja realmente exluir {clientItemState.nome}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleClientDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { ClientListPage };
