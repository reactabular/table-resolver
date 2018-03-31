import { get, has, isFunction } from 'lodash';

const reIsPlainProp = /^\w*$/;

function nested({ column }) {
  const { property } = column;

  if (!property) {
    return rowData => rowData;
  }

  // if users provide a custom getter instead of a
  // path for _.get, use that getter ...
  if (isFunction(property)) {
    // TODO: Function as key can't be right?
    return rowData => ({
      ...rowData,
      [property]: property(rowData)
    });
  }

  // Make things simple if the property is simple.  No copy needed.
  if (typeof property === 'string' && reIsPlainProp.test(property)) {
    return rowData => rowData;
  }

  return (rowData) => {
    // ... otherwise, make sure property exists, then _.get it
    if (!has(rowData, property)) {
      return rowData;
    }

    return {
      ...rowData,
      [property]: get(rowData, property)
    };
  };
}

export default nested;
