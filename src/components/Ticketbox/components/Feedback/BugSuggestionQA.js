const mapSiteLocationOptions = ({ name }) => {
  // project_showcase -> project showcase (user facing text)
  const text = name.split('_').join(' '); // CSS handles uppercasing
  // preserve snakecase naming for value submitted to API
  const value = name;
  return { text, value };
};

export const QA = (category, siteLocations) => [
    {
      text: 'Category',
      input_type: 'hidden',
      field_name: 'category',
    },
    {
      text: 'Type',
      input_type: 'dropdown', // TODO: "button_option" new Question input_type?
      field_name: 'sub_category',
      options: category === 'bug'
        ? [
            { text: 'Error Message', value: 'error' },
            { text: 'Malfunction', value: 'malfunction' },
          ] // bug category
        : [
            { text: 'Existing Feature', value: 'existing' },
            { text: 'New Feature', value: 'new' },
          ] // suggestion category
    },
    {
      text: 'Site Feature',
      input_type: 'dropdown',
      field_name: 'site_location',
      options: siteLocations.map(mapSiteLocationOptions),
    },
    {
      text: 'Title',
      input_type: 'text',
      field_name: 'title'
    },
    {
      text: 'Body',
      input_type: 'textarea',
      field_name: 'body'
    }
  ];