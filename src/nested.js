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
      console.warn( // eslint-disable-line no-console
        `resolve.nested - Failed to find "${property}" property from`,
        rowData
      );

      return {};
    }

    return {
      ...rowData,
      [property]: get(rowData, property)
    };
  };
}

export default nested;
