[![build status](https://secure.travis-ci.org/reactabular/table-resolver.svg)](http://travis-ci.org/reactabular/table-resolver) [![bitHound Score](https://www.bithound.io/github/reactabular/table-resolver/badges/score.svg)](https://www.bithound.io/github/reactabular/table-resolver) [![codecov](https://codecov.io/gh/reactabular/table-resolver/branch/master/graph/badge.svg)](https://codecov.io/gh/reactabular/table-resolver)

# table-resolver - Table resolution utilities

Sometimes your rows might come in a nested format or it might have a representation that maps to the underlying value. A name split to first and last parts is an example of the former. Country code to country mapping is an example of the latter.

```javascript
import * as resolve from 'table-resolver';

// Or you can cherry-pick
import { index } from 'table-resolver';
import { index as resolveIndex } from 'table-resolver';
```

## API

The API consists of two parts: **row resolvers** and **column resolvers**. If you have complex data, use the former. Latter come in handy if you have a nested column definition that needs to be flattened so that it works with a component like Reactabular.

## Row Resolvers

`table-resolver` uses an iterator that accepts rows and then transforms it using a specific resolver or several assuming they have been composed.

### `resolve.resolve`

**`({ columns: <columns>, method: <resolver function>}) => <rows> => <rows>`**

The `resolve` iterator accepts columns and a method. When applied with rows, it will return resolved rows. A resolver function accepts a function with signature like this: `({ rowData, rowIndex, column }) => <resolved row>`.

### `resolve.index`

**`({ rowIndex }) => (rowData) => <resolved row>`**

`resolve.index` attached `rowIndex` at `_index` field of the returned row. This can be handy information to have for optimization purposes (`reactabular-tree`) but most often you don't have to use this one.

### `resolve.nested`

**`({ column }) => (rowData) => <resolved row>`**

The `nested` resolver digs rows from a `property: 'name.first'` kind of definition and maps the received value to property name. It replaces the original value with the resolved one.

### `resolve.byFunction`

**`(path: <string>) => ({ column }) => (rowData) => <resolved row>`**

The `byFunction` resolver accepts a path from where to look for a resolving function. It could be `column.cell.resolve` for example and you can use a nested definition for getting it from your column definition.

Instead of replacing the original value, `byFunction` generates `_<property>` kind of field to the resulting rows. This sort of implicit rule is useful for other functionality as it can rely on the same convention.

## Column Resolvers

### `resolve.columnChildren`

**`({ columns, childrenField = 'children' }) => <resolved columns>`**

Assuming your column definition is nested, this function resolves it to a flat format.

### `resolve.headerRows`

**`({ columns, childrenField = 'children' }) => <resolved columns>`**

If your column definition is nested, you have to resolve it to header rows. `resolve.headerRows` has been designed exactly for this purpose.

## Combining Resolvers

If you want to combine resolvers, you can achieve it like this.

```javascript
import { compose } from 'redux';

...

const resolver = resolve.resolve({
  columns,
  method: (extra) => compose(
    resolve.byFunction('cell.resolve')(extra),
    resolve.nested(extra)
  )
});
```

## Resolution Example

The following example shows how you to resolve nested values.

**Example:**

```jsx
/*
import * as resolve from 'table-resolver';
*/

const columns = [
  {
    property: 'color',
    header: {
      label: 'Color'
    }
  },
  {
    property: 'name.first',
    header: {
      label: 'First Name'
    }
  },
  {
    property: 'name.last',
    header: {
      label: 'Last Name'
    }
  }
];

const rows = [
  {
    id: 1,
    color: 'red',
    name: {
      first: 'John',
      last: 'Johnson'
    },
    company: 'John Inc.',
    sentence: 'consequatur nihil minima corporis omnis nihil rem'
  },
  {
    id: 2,
    color: 'blue',
    name: {
      first: 'Mike',
      last: 'Mikeson'
    },
    company: 'Mike Inc.',
    sentence: 'a sequi doloremque sed id quo voluptatem voluptatem ut voluptatibus'
  }
];

<ul>{
  resolve.resolve(
    { columns, method: resolve.nested }
  )(rows).map((d, i) =>
    <li key={`value-${i}`}>{JSON.stringify(d, null, 2)}</li>
  )
}</ul>
```

## License

MIT. See LICENSE for details.
