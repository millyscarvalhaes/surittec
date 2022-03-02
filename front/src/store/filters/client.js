import values from "lodash/values";

export const clientFilter = ({ clientState }) => {
  return {
    clientList: clientState.clientList,
    clientItem: clientState.clientItem,
  };
};
