function resolve({
  columns,
  method = () => rowData => rowData,
  indexKey = '_index'
}) {
  if (!columns) {
    throw new Error('resolve - Missing columns!');
  }

  return (rows = []) => {
    const methodsByColumn = columns.map(column => method({ column }));

    return rows.map((rowData, rowIndex) => {
      let ret = {
        [indexKey]: rowIndex,
        ...rowData
      };

      methodsByColumn.forEach((boundMethod) => {
        ret = boundMethod(ret);
      });

      return ret;
    });
  };
}

export default resolve;
