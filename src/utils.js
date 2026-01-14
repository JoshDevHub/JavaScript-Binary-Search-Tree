function verifyCallbackArg(arg) {
  if (typeof arg !== "function") {
    throw new TypeError(`${arg} is not a function`);
  }
}

function isNullish(value) {
  return value === undefined || value === null;
}

function isPresent(value) {
  return !isNullish(value);
}

export { verifyCallbackArg, isPresent, isNullish };
