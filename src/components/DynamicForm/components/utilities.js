import { isEmail, isURL } from "validator";
import { isEmpty } from "lodash";

const areChoicesValid = (choices, min, max) => {
  const minChoices = min || 1;
  const maxChoices = max || 100;
  const numChoices = choices.length;
  return numChoices >= minChoices && numChoices <= maxChoices;
}

const isTextValid = (text, min, max) => {

  const minLength = min || 10;
  const maxLength = max || 1000;
  const textLength = text.length;
  return textLength >= minLength && textLength <= maxLength;
}

const isValid = (value, min, max) => {
  return Array.isArray(value)
    ? areChoicesValid(value, min, max)
    : isTextValid(value, min, max);
}

const isFieldInvalid = (type, value, min, max) => {
  if (!isEmpty(value)) return false;

  switch (type) {
    case "email": return !isEmail(value);
    case "url": return !isURL(value);
    case "radio": return isEmpty(value);
    default: return !isValid(value, min, max);
  }
}

export {
  isEmpty,
  isFieldInvalid,
};
