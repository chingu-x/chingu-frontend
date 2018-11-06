# Goals
- readability
- accessibility of related files
- separation of path-associated Views from their constituent Components
- intuitive navigation of grouped components

# Guidelines
- always use absolute imports from `./src/path/to/import`

# Structure
```sh
src/
  - views/
    - ViewName.jsx
    - ViewName/
  - components/
    - ViewName/
    - UI/
    - Utility/
    - Static/
  - queries/
  - mutations/
  - utils/
  - assets/
  - styles/
  - App.jsx
  - index.js

```
- `utils/`: shared non component utilities (formatting)
- `styles/`: shared SCSS and config
- `assets/`: shared static assets
- `App.jsx`: import `views/` for Router
- `index.js`: root export with wrappers and configuration

## Queries and Mutations
- only used in the component: write in the component file
- shared by multiple components: write in `queries/` or `mutations/`
  - `queryName.js` or `mutationName.js`
- label the queries or mutations for easier debugging
```js
query DescriptiveLabelName($input_name: input_type) {
  query(input: $input) {
    return_field
  }
}

mutation DescriptiveActionName($input_name: input_type) {
  mutation(input: $input) {
    return_field
  }
}
```

### mutations
- when calling a mutation of data owned by and returning a Type always request back
  - the `id` field
  - the fields that were updated
- this will keep the cache consistent and remove the need for callback-based updates

## `views/`
- `/ViewName.jsx`
  - imports children and renders a path-associated view
- `/ViewName/`
  - `index.jsx`: same as `ViewName.jsx`
  - include non-component support files specific to the view (custom styling, assets, animations)

## `components/`
- `ViewName/`: components only used in a single View
- `Category/`: shared components under a common category
  - `UI/`: base UI components (buttons, cards)
  - `Utility/`: utility components (`<Request />`, `<Modal />`)
  - `Static/`: static homepage components
- `ComponentName/`: complex shared components not necessarily under a view or category (rare)

### component directories
- each directory should have a default export from `index.jsx`
- components should contain one SCSS file per depth of directory

### component definitions within the directories
- components should mostly remain in flat `.jsx` files
- if a component grows in complexity to require sub-components create a dir by its name to contain them
  - follows component directory guidelines
  - this new dir should now contain the SCSS styles for itself and sub-components
  - **rarely extend deeper than one sub-directory component**
