import { CLIENT_CONSTRAINTS } from "../actions/client-actions";

const clientState = { clientList: [], clientItem: {} };

export function clientReducer(state = clientState, dispatch) {
  switch (dispatch.type) {
    case CLIENT_CONSTRAINTS.LIST:
      return { ...state, clientList: dispatch.content };
    case CLIENT_CONSTRAINTS.FIND:
      return { ...state, clientItem: dispatch.content };
    case CLIENT_CONSTRAINTS.DELETE:
      return {
        ...state,
        clientList: state.clientList.filter((client) => client.id !== dispatch.content),
      };
    case CLIENT_CONSTRAINTS.SAVE:
      return {
        ...state,
        clientList: state.clientList.concat(dispatch.content),
      };
    case CLIENT_CONSTRAINTS.UPDATE:
      return {
        ...state,
        clientList: state.clientList.map((client) => {
          return client.id == dispatch.content.id ? dispatch.content : client;
        }),
      };
    case CLIENT_CONSTRAINTS.CLEAR:
      return { ...state, clientList: [], clientItem: {} };
    default:
      return state;
  }
}
