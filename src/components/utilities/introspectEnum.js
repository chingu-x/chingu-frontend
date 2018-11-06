const { gql } = require("apollo-boost");

/**
 * @param {string} enumName name of the Enum to get values from
 * @param {string} dataDotName name of the property to access the enum values (data.dataDotName.options)
 * @param {string} queryName [optional] rename the query for logging. default: EnumInstrospectionQuery
 * @returns {object} introspectionQuery (gql``) object
 */
const introspectEnum = (
  enumName,
  dataDotName,
  queryName,
) => {
  const queryDef = `
    query ${queryName || "EnumInstrospectionQuery"} {
      ${dataDotName}: __type(name: "${enumName}") {
          name
          options: enumValues {
            name
          }
      }
    }
  `;
  return gql(queryDef);
}

export default introspectEnum;
