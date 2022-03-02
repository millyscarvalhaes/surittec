export const ALERT_CONSTRAINTS = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  CLEAR: "CLEAR",
};

export const alertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: ALERT_CONSTRAINTS.SUCCESS, content: message };
}

function error(message) {
  return { type: ALERT_CONSTRAINTS.ERROR, content: message };
}

function clear() {
  return { type: ALERT_CONSTRAINTS.CLEAR };
}
