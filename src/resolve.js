function resolve({ columns, method }, options = {}) {
  if (!columns) {
    throw new Error('resolve - Missing columns!');
  }
  if (!method) {
    throw new Error('resolve - Missing method!');
  }

  return (rows = []) => {
    const methodsByColumnIndex = columns.map(column => method({ column }));

    return rows.map((rowData, rowIndex) => {
      let ret = {};

      columns.forEach((column, columnIndex) => {
        const result = methodsByColumnIndex[columnIndex](rowData);

        delete result.undefined;

        ret = {
          ...rowData,
          ...ret,
          ...result,
          _index: rowIndex,
        };
      });

      return ret;
    });
  }
}

export default resolve;
