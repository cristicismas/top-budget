export const capitalize = string => (string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : '');

export const getSingularForm = fieldName => {
  switch (fieldName) {
    case 'categories':
      return 'category';
    case 'locations':
      return 'location';
    case 'sources':
      return 'source';
    default:
      throw new Error('getSingularForm() requires a valid argument');
  }
}