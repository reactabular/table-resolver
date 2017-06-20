import { omit } from 'lodash';
import countRowSpan from './count-row-span';
import countColSpan from './count-col-span';

function resolveHeaderRows({
  columns,
  childrenField = 'children'
}) {
  const resolvedChildren = [];

  const ret = columns.map((column) => {
    const children = column[childrenField];
    const col = omit(column, [childrenField]);

    if (children && children.length) {
      resolveHeaderRows({ columns: children, childrenField }).forEach((cells, depth) => {
        resolvedChildren[depth] = [...(resolvedChildren[depth] || []), ...cells];
      });

      return Object.assign({}, col, {
        props: Object.assign({
          colSpan: countColSpan(children, 0)
        }, col.props)
      });
    }

    return Object.assign({}, col, {
      props: Object.assign({
        rowSpan: countRowSpan(columns)
      }, col.props)
    });
  });

  return resolvedChildren.length ? [ret].concat(resolvedChildren) : [ret];
}

export default resolveHeaderRows;
