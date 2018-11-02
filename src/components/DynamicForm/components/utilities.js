import { isEmail, isURL } from "validator";
import { isEmpty } from "lodash";

const areChoicesValid = (choices, min, max) => {
  const minChoices = min || 1;
  const maxChoices = max || 100;
  const numChoices = choices.length;
  return numChoices >= minChoices && numChoices <= maxChoices;
}

const isTextValid = (text, min, max) => {
  const minLength = min || 1;
  const maxLength = max || 1000;
  const textLength = text.length;
  return textLength >= minLength && textLength <= maxLength;
}

const isValid = (value, min, max) => {
  return Array.isArray(value)
    ? areChoicesValid(value, min, max)
    : isTextValid(value, min, max);
}

const isSkillSetterInvalid = (skill_ids) => {
  // removes the nulls at the end of the array
  while (skill_ids[skill_ids.length - 1] === null) {
    skill_ids.pop()
  }

  // return valid if no-nulls
  return skill_ids.every(skill => { return skill !== null });
}

const isFieldInvalid = (type, value, min, max) => {
  switch (type) {
    case "email": return !isEmail(value);
    case "url": return !isURL(value);
    case "radio": return isEmpty(value);
    case "skill_setter": return !isSkillSetterInvalid(value);
    default: return !isValid(value, min, max);
  }
}

export {
  isEmpty,
  isFieldInvalid,
};
