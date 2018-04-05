import { get } from 'lodash';

function byFunction(path) {
  /* eslint no-param-reassign: "off" */

  return ({ column = {} }) => (rowData) => {
    const { property } = column;
    const resolver = get(column, path);

    if (!property || !resolver) {
      return rowData;
    }

    const value = rowData[property];

    rowData[`_${property}`] = resolver(value, {
      property,
      rowData
    });

    return rowData;
  };
}

export default byFunction;
