function countColSpan(columns, returnCount) {
  let count = returnCount;
  if (columns && columns.length > 0) {
    columns.forEach((column) => {
      if (column.children && column.children.length > 0) {
        count = countColSpan(column.children, count);
      } else {
        count += 1;
      }
    });
  }
  return count;
}

export default countColSpan;
