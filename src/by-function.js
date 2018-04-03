import { get } from 'lodash';

function byFunction(path) {
  return ({ column = {} }) => (rowData) => {
    const { property } = column;
    const resolver = get(column, path);

    if (!property || !resolver) {
      return rowData;
    }

    const value = rowData[property];
    const ret = {
      ...rowData,
      [property]: value
    };

    ret[`_${property}`] = resolver(value, {
      property,
      rowData
    });

    return ret;
  };
}

export default byFunction;
