function resolve({
  columns,
  method = () => rowData => rowData,
  indexKey = '_index'
}) {
  if (!columns) {
    throw new Error('resolve - Missing columns!');
  }

  return (rows = []) => {
    const methodsByColumnIndex = columns.map(column => method({ column }));

    return rows.map((rowData, rowIndex) => {
      let ret = {};

      columns.forEach((column, columnIndex) => {
        const result = methodsByColumnIndex[columnIndex](rowData);

        delete result.undefined;

        ret = {
          [indexKey]: rowIndex,
          ...rowData,
          ...ret,
          ...result
        };
      });

      return ret;
    });
  };
}

export default resolve;
