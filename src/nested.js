import { get, has, isFunction } from 'lodash';

function nested({ column }) {
  return (rowData) => {
    const { property } = column;

    if (!property) {
      return {};
    }

    // if users provide a custom getter instead of a
    // path for _.get, use that getter ...
    if (isFunction(property)) {
      return {
        ...rowData,
        [property]: property(rowData)
      };
    }

    // ... otherwise, make sure property exists, then _.get it
    if (!has(rowData, property)) {
      return {};
    }

    return {
      ...rowData,
      [property]: get(rowData, property)
    };
  };
}

export default nested;
