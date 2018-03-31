import { nested } from '../src';

describe('resolve.nested', function () {
  it('resolves nested values', function () {
    const lastName = 'demo';
    const property = 'name.last';
    const rowData = {
      name: {
        last: lastName
      }
    };
    const expected = {
      name: {
        last: lastName
      },
      [property]: lastName
    };
    const column = { property };

    expect(nested({ column })(rowData)).toEqual(expected);
  });
  it('resolves nested values, using a custom getter', function () {
    const last = 'demo';
    const property = a => (a.name || {}).last;
    const rowData = {
      name: { last }
    };
    const expected = {
      name: { last },
      [property]: last
    };
    const column = { property };

    expect(nested({ column })(rowData)).toEqual(expected);
  });

  it('resolves normal values', function () {
    const name = 'demo';
    const property = 'name';
    const rowData = {
      name
    };
    const column = { property };

    expect(nested({ column })(rowData)).toEqual({ [property]: name });
  });

  it('does nothing if there is no property', function () {
    const name = 'demo';
    const rowData = {
      name
    };
    const column = { property: undefined };

    expect(nested({ column })(rowData)).toEqual(rowData);
  });

  it('does not crash without a property', function () {
    const name = 'demo';
    const rowData = {
      name
    };
    const column = { cell: {} };

    expect(nested({ column })(rowData)).toEqual(rowData);
  });

  it('does not crash without a cell', function () {
    const name = 'demo';
    const rowData = {
      name
    };
    const column = {};

    expect(nested({ column })(rowData)).toEqual(rowData);
  });
});
