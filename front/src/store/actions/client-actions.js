import { clientService } from "../../services/client-service";

export const CLIENT_CONSTRAINTS = {
  LIST: "CLIENT_LIST",
  FIND: "CLIENT_FIND",
  SAVE: "CLIENT_SAVE",
  UPDATE: "CLIENT_UPDATE",
  DELETE: "CLIENT_DELETE",
  CLEAR: "CLEAR_STATE",
};

export const clientActions = {
  list,
  findById,
  save,
  deleteById,
  clearState,
};

function clearState() {
  return (dispatch) => {
    dispatch({ type: CLIENT_CONSTRAINTS.CLEAR, content: {} });
  };
}

function list() {
  return (dispatch) => {
    clientService.list().then((result) => {
      dispatch({ type: CLIENT_CONSTRAINTS.LIST, content: result.data });
    });
  };
}

function findById(id) {
  return (dispatch) => {
    clientService.findById(id).then((result) => {
      dispatch({ type: CLIENT_CONSTRAINTS.FIND, content: result.data });
    });
  };
}

function save(client) {
  return (dispatch) => {
    clientService.save(client).then((result) => {
      const action = client.id === undefined ? CLIENT_CONSTRAINTS.SAVE : CLIENT_CONSTRAINTS.UPDATE;
      dispatch({ type: action, content: result.data });
    });
  };
}

function deleteById(id) {
  return (dispatch) => {
    clientService.deleteById(id).then((result) => {
      dispatch({ type: CLIENT_CONSTRAINTS.DELETE, content: id });
    });
  };
}
