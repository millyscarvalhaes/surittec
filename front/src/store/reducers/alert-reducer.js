import { ALERT_CONSTRAINTS } from "../actions/alert-action";

const alertState = { type: "", message: "" };
export function alertReducer(state = alertState, dispatch) {
  switch (dispatch.type) {
    case ALERT_CONSTRAINTS.SUCCESS: {
      return { type: "alert-success", message: dispatch.content };
    }
    case ALERT_CONSTRAINTS.ERROR: {
      return { type: "alert-danger", message: dispatch.content };
    }
    case ALERT_CONSTRAINTS.CLEAR: {
      return {};
    }
    default:
      return state;
  }
}
