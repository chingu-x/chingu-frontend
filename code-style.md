# Chingu Coding Style
- updated 11/4/18

# Core
- base of AirBnB coding style
- readability and ease of writing
- consistency across codebases and authors
- rejecting rules that needlessly restrict coding

# Basics
- 2 spaces (not tabs)
- semicolons to end all statements
  - no inline statement chaining
- maximum column length of 100 characters
- new lines at the ends of each file

# Trailing Commas

# Parameter lists
If fitting in less than 100 column length: inline
Extending beyond 100 column length: multi-line (trailing comma)

# Destructuring
Parameter lists
One param: destructuring ok
Multi param: param name => destructure in first lines of function body
Column length: break across multi line if extending beyond 100

# JSDocs
- define above all classes and functions / methods
- first line should be `updated: MM/DD/YY`
  - update this line whenever params or props are changed

## minimum
- @param [@prop for Components]
  - `@param paramName {type} description of param expected values and/or usage
  - list required params first
  - skip a line and use `-- OPTIONAL --` as a line separator before the optional params
- @return [not needed for Components]

## optional
- `@example` (skip line then write sample usage)

## object properties
- `@param objectName {type} description of object parameter as a whole`
- `@param objectName.propertyName {type} description of object param property`

## example
```js
/**
 * updated: 10/22/18
 * 
 * @prop {array} questions array of Question data objects for rendering
 * @prop {string} purpose Dynamic Form collection name (for form data persistence)
 * @prop {array} questions array of Dynamic Question objects
 * 
 * -- OPTIONAL --
 * @prop {object} initialData CAUTION: very delicate - must match expected shape EXACTLY. Provide initial form_data. 
 * @prop {object} hiddenData values for 'hidden' input types -> { field_name: value }
 * @prop {bool} persistence controls storing form data in LS onFormChange
 * @prop {func} onSubmit wrapper callback for handling submit behavior
 * @prop {func} onValidate callback for field level control of 'disabled' flag. expects boolean return
 * @prop {func} onInputChange observation-only handler with args (field_name, value, form_data)
 * @prop {func} customComponents custom input_type components (merged with defaults, precedence to custom components)
 */
```



# Client PropTypes
In class def using static propTypes
- define expected shapes
- use `isRequired`
## PropType functions for expected values
- use proptype functions for controlling expected values
- throw useful error message
```js
```
